import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from 'react';
import * as S from './styles';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import {
  ARROW_LEFT,
  BG_SKIN,
  DOWNLOAD_GRAY,
  DOWNLOAD_VIDEO,
  LIKE_GRAY,
  PLAY,
  SHARE,
  SIZE,
  SKINS_LEFT_ARROW,
  SKINS_RIGHT_ARROW,
  VERSION,
} from '@src/assets/constants/imagePaths';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import storageService from '@src/modules/core/services/StorageService';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { theme } from '@styles/theme';
import { Alert, Linking } from 'react-native';
import UDCarouselSlider from '@src/modules/ud-ui/components/ud-carousel';
import { getExistInfo } from '@src/modules/ud-ui/hooks/getExistInfo';
import useSkinsStore from '@src/modules/skins/store';
import useFile from '@src/modules/ud-ui/hooks/useFile';
import { useShare } from '@src/modules/ud-ui/hooks/useShare';
import advertisingService from '@src/modules/advertising/services/AdvertisingService';
import likeService from '@src/modules/your-like-list/domain/services/LikeService';
import DownloadErrorModal from '@src/modules/ud-ui/components/ud-download-container/error-modal';
import { HowToInstallText } from './styles';
import LottieView from 'lottie-react-native';
import useModsStore from '@src/modules/mods/store';
import filesService from '@src/modules/files/domain/services/FilesServise';
import { formatBytes } from '@src/modules/settings/domain/helpers/formatBytes';
import useMapsStore from '@src/modules/maps/store';
import useSeedsStore from '@src/modules/seeds/store';
import useTranslationsStore from '@src/modules/translations/store';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

interface Props {
  categoryItem: CategoryItem;
  categoryType: CategoryType;
  setItemId: (itemId: string) => void;
}

export default function UDDownloadContainer(props: Props) {
  const { categoryItem, categoryType, setItemId } = props;
  const { file, filepath, id, downloads, likes } = categoryItem;

  const [numLikes, setNumLikes] = useState(likes);

  const { t } = useAppTranslation(['shared']);

  const { updateMod } = useModsStore();
  const { updateMap } = useMapsStore();
  const { skins, updateSkin } = useSkinsStore();
  const { updateSeed } = useSeedsStore();
  const { currentLanguage } = useTranslationsStore();
  const { share } = useShare();
  const isExist = getExistInfo(categoryItem, categoryType);
  const name = useMemo(
    () =>
      currentLanguage && currentLanguage === 'en'
        ? categoryItem.name.en
        : categoryItem.name.ru,
    [categoryItem.id, currentLanguage],
  );

  const [likedListIds, setLikedListIds] = useState<string[]>([]);
  const [isDownloading, setDownloading] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [isImageDelayLoading, setIsImageDelayLoading] = useState(true);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  const { downloadFile, openFile } = useFile({ setPercentage });

  const isSkinsCategory = categoryType === 'skins';
  const isSeedsCategory = categoryType === 'seeds';
  const fullName = categoryItem.file?.fullName;
  const generationKey = categoryItem?.generationKey;

  const appUrl = 'https://maincraftmodsapp.page.link';
  const urlShare = appUrl + '/' + categoryType + '/' + String(id);

  const updateCategory = useMemo(() => {
    return categoryType === 'mods'
      ? updateMod
      : categoryType === 'maps'
      ? updateMap
      : categoryType === 'skins'
      ? updateSkin
      : updateSeed;
  }, [categoryType, updateMap, updateMod, updateSeed, updateSkin]);

  const isLiked = useMemo(
    () => likeService.checkIsLikePress(categoryItem.id, likedListIds),
    [categoryItem.id, likedListIds],
  );

  useEffect(() => {
    setTimeout(() => {
      setIsImageDelayLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    getData().then();
  }, []);

  useEffect(() => {
    if (isLiked) {
      animationRef.current?.play(0, 65);
    }
  }, [isLiked]);

  const getData = useCallback(async () => {
    await storageService.getData(categoryType).then(res => {
      if (res) {
        setLikedListIds(res as string[]);
      }
    });
  }, [categoryType]);

  const download = useCallback(async () => {
    const statusCode = await downloadFile(
      setDownloading,
      categoryType,
      fullName,
      setIsErrorModalVisible,
    );
    if (statusCode === 200) {
      await filesService
        .putDownload(categoryType, categoryItem.id)
        .then(res => {
          if (res) {
            updateCategory(res);
          }
        });
    }
  }, [downloadFile, categoryType, fullName, categoryItem.id, updateCategory]);

  const onDownloadPressed = useCallback(async () => {
    try {
      if (isExist) {
        await openFile(filepath, setIsErrorModalVisible);
      } else {
        await advertisingService.showRewardedVideo(
          download,
          isSeedsCategory,
          fullName,
        );
      }
    } catch (err) {
      Alert.alert('Error: ', String(err), [
        { text: 'Cancel', style: 'cancel' },
      ]);
      setDownloading(false);
    }
  }, [download, filepath, isExist, isSeedsCategory, openFile, fullName]);

  const onPressLike = useCallback(async () => {
    await likeService.setIdLikedItem(
      categoryItem.id,
      likedListIds,
      categoryType,
    );
    if (isLiked) {
      setNumLikes(prevState => prevState - 1);
      animationRef.current?.play(65, 110);
      likeService.deleteLike(categoryItem.id).then(res => {
        if (res) {
          updateCategory(res);
        }
      });
    } else {
      setNumLikes(prevState => prevState + 1);
      animationRef.current?.play(0, 65);
      likeService.putLike(categoryItem.id).then(res => {
        if (res) {
          updateCategory(res);
        }
      });
    }
    await getData();
  }, [
    categoryItem,
    likedListIds,
    categoryType,
    isLiked,
    getData,
    updateCategory,
  ]);

  const animationRef = useRef<LottieView>(null);

  const onPressShare = useCallback(() => {
    share(name, urlShare);
  }, [name, share, urlShare]);

  const buttonTextResolver = useCallback(() => {
    if (isSeedsCategory) {
      return t('copy_seed');
    } else if (isExist) {
      return t('open');
    } else if (isDownloading) {
      return `${t('loading')}... ${percentage}%`;
    } else {
      return t('download');
    }
  }, [isDownloading, isExist, isSeedsCategory, percentage, t]);

  const TopImageSkins = useCallback(() => {
    return (
      <S.SkinsImageWrap>
        <S.SkinsBgImage source={BG_SKIN}>
          <S.SkinsImage
            source={{
              uri: categoryItem.picture.url,
            }}
          />
        </S.SkinsBgImage>

        <S.SkinsCounter fSize={20}>
          {skins.indexOf(categoryItem) + 1} / {skins.length}
        </S.SkinsCounter>
      </S.SkinsImageWrap>
    );
  }, [categoryItem, skins]);

  const TopImageCategory = useCallback(() => {
    return (
      <UDCarouselSlider
        isImageDelayLoading={isImageDelayLoading}
        imageData={[categoryItem]}
        height={220}
      />
    );
  }, [categoryItem.id, isImageDelayLoading]);

  const onPressPrevSkins = () => {
    const indexPrev = skins.indexOf(categoryItem) - 1;
    if (indexPrev >= 0) {
      const prevItem = skins[indexPrev];
      setItemId(prevItem.id);
    }
  };

  const onPressNextSkins = () => {
    const indexNext = skins.indexOf(categoryItem) + 1;
    if (indexNext < skins.length) {
      const nextItem = skins[indexNext];
      setItemId(nextItem.id);
    }
  };

  const onPressHowInstall = async () => {
    const supported = await Linking.canOpenURL(categoryItem.videoUrl.en);
    if (supported) {
      await Linking.openURL(categoryItem.videoUrl.en);
    } else {
      Alert.alert(
        `Don't know how to open this URL: ${categoryItem.videoUrl.en}`,
      );
    }
  };

  return (
    <S.Container>
      <S.ShadowCarousel>
        {isSkinsCategory ? <TopImageSkins /> : <TopImageCategory />}
      </S.ShadowCarousel>

      <S.ArrowBackWrap onPress={() => navigateBack()}>
        <S.ArrowBack source={ARROW_LEFT} />
      </S.ArrowBackWrap>

      <S.ShareWrap onPress={onPressShare}>
        <S.Share source={SHARE} />
      </S.ShareWrap>

      <S.LikeWrap
        onPress={onPressLike}
        activeOpacity={1}
        isSkinsCategory={isSkinsCategory}>
        <LottieView
          style={{
            left: '15%',
            bottom: '10%',
            width: 61,
            height: 61,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 1,
          }}
          loop={false}
          ref={animationRef}
          source={require('../../../../assets/animations/Like_2.json')}
          duration={1500}
        />
        {!isSkinsCategory && (
          <S.LikeCounter fSize={15}>{numLikes}</S.LikeCounter>
        )}

        {/* <S.LikeBg
          isLikePress={isLikePress(categoryItem.id, likedListIds)}
          isSkinsCategory={isSkinsCategory}>
          <S.Like
            resizeMode="contain"
            source={isLikeInList(categoryItem.id, likedListIds)}
          />
        </S.LikeBg> */}
      </S.LikeWrap>

      {!isSkinsCategory && (
        <S.NameCategoryItem fSize={24} color={'grayDark'}>
          {name}
        </S.NameCategoryItem>
      )}

      {!isSeedsCategory && !isSkinsCategory && (
        <S.DetailsWrap isSkinsCategory={false}>
          <S.SizeIcon source={SIZE} />
          <S.DetailsBottomText fSize={13}>
            {formatBytes(file.size)}
          </S.DetailsBottomText>

          <S.DownloadIcon source={DOWNLOAD_GRAY} />
          <S.DetailsBottomText fSize={13}>{downloads}</S.DetailsBottomText>

          <S.VersionsIcon source={VERSION} />
          <S.DetailsBottomText fSize={13}>
            {categoryItem.version}
          </S.DetailsBottomText>
        </S.DetailsWrap>
      )}

      <S.DownloadButtonsPanel isSkinsCategory={isSkinsCategory}>
        {isSkinsCategory && (
          <S.SkinsLeftArrowWrap onPress={() => onPressPrevSkins()}>
            <S.SkinsLeftArrow source={SKINS_LEFT_ARROW} />
          </S.SkinsLeftArrowWrap>
        )}

        <S.DownloadWrap
          onPress={onDownloadPressed}
          isSkinsCategory={isSkinsCategory}>
          <S.DownloadTextWrap>
            <S.DownloadText color={'light'}>
              {buttonTextResolver()}
            </S.DownloadText>

            {!isExist && !isDownloading && (
              <S.DownloadVideoIcon
                source={DOWNLOAD_VIDEO}
                resizeMode={'contain'}
              />
            )}
          </S.DownloadTextWrap>

          <ProgressBar
            progress={isDownloading ? percentage / 100 : 1}
            width={null}
            height={50}
            color={theme.colors.green}
            unfilledColor={'#CCCCCC'}
            borderWidth={0}
            borderRadius={10}
          />
        </S.DownloadWrap>

        {isSkinsCategory && (
          <S.SkinsArrowRightWrap onPress={() => onPressNextSkins()}>
            <S.SkinsRightArrow source={SKINS_RIGHT_ARROW} />
          </S.SkinsArrowRightWrap>
        )}
      </S.DownloadButtonsPanel>

      <S.HowToInstallWrap
        onPress={() => onPressHowInstall()}
        isSkinsCategory={isSkinsCategory}>
        <HowToInstallText color={'light'}>
          {t('how_to_install')}
        </HowToInstallText>
        <S.PlayIcon source={PLAY} resizeMode={'contain'} />
      </S.HowToInstallWrap>

      {isSkinsCategory && (
        <S.DetailsWrap isSkinsCategory={isSkinsCategory}>
          <S.SizeIcon source={SIZE} />
          <S.DetailsBottomText fSize={13}>
            {formatBytes(file.size)}
          </S.DetailsBottomText>

          <S.DownloadIcon source={DOWNLOAD_GRAY} />
          <S.DetailsBottomText fSize={13}>{downloads}</S.DetailsBottomText>

          <S.LikeDetails resizeMode="contain" source={LIKE_GRAY} />
          <S.DetailsBottomText fSize={13}>{likes}</S.DetailsBottomText>
        </S.DetailsWrap>
      )}

      {isSeedsCategory && generationKey && (
        <S.SeedKey color={'grayDark'} fSize={20}>
          {t('seed')}: {generationKey}
        </S.SeedKey>
      )}

      <DownloadErrorModal
        isErrorModalVisible={isErrorModalVisible}
        setIsErrorModalVisible={setIsErrorModalVisible}
      />
    </S.Container>
  );
}
