import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import Config from 'react-native-config';
import {
  ARROW_LEFT,
  DOWNLOAD_GRAY,
  DOWNLOAD_VIDEO,
  SHARE,
  SIZE,
  VERSION,
} from '@src/assets/constants/imagePaths';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import likeService from '@src/modules/core/services/LikeService';
import storageService from '@src/modules/core/services/StorageService';
import FileViewer from 'react-native-file-viewer';
// @ts-ignore
import ProgressBar from 'react-native-progress/Bar';
import { theme } from '@styles/theme';
import { Alert } from 'react-native';
import UDCarouselSlider from '@src/modules/ud-ui/components/ud-carousel';
import Modal from 'react-native-modal';
import useSettingsStore from '@src/modules/settings/store';
import { getExistInfo } from '@src/modules/ud-ui/hooks/getExistInfo';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import useFile from '@src/modules/ud-ui/hooks/useFile';
import { useShare } from '@src/modules/ud-ui/hooks/useShare';

interface Props {
  categoryItem: CategoryItem;
  categoryType: CategoryType;
  setIsRewardedVideoOpen: (bool: boolean) => void;
  refresh: () => void;
}

export default function UDDownloadContainer(props: Props) {
  const { categoryItem, categoryType, setIsRewardedVideoOpen, refresh } = props;
  const { engName, fileName, filepath } = categoryItem;

  const { loadCacheSize } = useSettingsStore();
  const { loadExistMods } = useModsStore();
  const { loadExistMaps } = useMapsStore();
  const { loadExistSkins } = useSkinsStore();
  const { loadExistSeeds } = useSeedsStore();

  const isExist = getExistInfo(categoryItem, categoryType);

  const [likedListIds, setLikedListIds] = useState<CategoryItem[]>([]);
  const [isDownloading, setDownloading] = useState(false);
  const [percentage, setPercentage] = useState<number>(0);
  const [isImageDelayLoading, setIsImageDelayLoading] = useState(true);
  const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsImageDelayLoading(false);
    }, 500);
  }, []);

  const urlDownload = Config.API_URL + categoryType + '/';
  const urlShare = Config.API_URL + categoryType + '/' + engName;

  const { download } = useFile({ setPercentage });

  const onError = (err: any) => {
    Alert.alert('Error: ', String(err), [{ text: 'Cancel', style: 'cancel' }]);
  };

  const downloadFile = async () => {
    setDownloading(true);
    const { statusCode, filepath } = await download({
      url: urlDownload,
      filename: fileName,
    });
    refresh();
    loadCacheSize();
    loadExistMods();
    loadExistMaps();
    loadExistSkins();
    loadExistSeeds();
    setDownloading(false);
    if (statusCode === 200) {
      await openFile(filepath);
    } else {
      onError('Ошибка');
    }
  };

  const openFile = async (filepath: string) => {
    try {
      await FileViewer.open(filepath, {
        showOpenWithDialog: true,
        showAppsSuggestions: false,
      });
    } catch {
      setIsErrorModalVisible(true);
    }
  };

  const openRewardedVideo = () => {
    setIsRewardedVideoOpen(true);
    setTimeout(() => {
      setIsRewardedVideoOpen(false);
    }, 650);
  };

  const onDownloadPressed = useCallback(async () => {
    try {
      if (isExist) {
        await openFile(filepath);
      } else {
        openRewardedVideo();
        await downloadFile();
      }
    } catch (err) {
      onError(err);
      setDownloading(false);
    }
  }, [isExist]);

  const isLikePress = likeService.checkIsLikePress;
  const isLikeInList = likeService.checkLikeInListIds;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await storageService.getData(categoryType).then(res => {
      if (res) setLikedListIds(res);
    });
  };

  const onPressLike = async (item: any) => {
    await likeService.setIdLikedItem(item, likedListIds, categoryType);
    getData();
  };

  const onPressArrowBack = () => {
    navigateBack();
  };

  const onPressShare = useCallback(() => {
    useShare(engName, urlShare);
  }, [engName, urlShare]);

  const onPressBackButton = () => {
    setIsErrorModalVisible(false);
  };

  return (
    <S.Container>
      <S.ShadowCarousel>
        <UDCarouselSlider
          isImageDelayLoading={isImageDelayLoading}
          imageData={[categoryItem]}
          height={220}
          categoryType={categoryType}
        />
      </S.ShadowCarousel>

      <S.ArrowBackWrap onPress={onPressArrowBack}>
        <S.ArrowBack source={ARROW_LEFT} />
      </S.ArrowBackWrap>

      <S.ShareWrap onPress={onPressShare}>
        <S.Share source={SHARE} />
      </S.ShareWrap>

      <S.LikeWrap onPress={() => onPressLike(categoryItem)} activeOpacity={1}>
        <S.LikeBg isLikePress={isLikePress(categoryItem, likedListIds)}>
          <S.Like source={isLikeInList(categoryItem, likedListIds)} />
        </S.LikeBg>
        <S.LikeCounter fSize={15}>1.5k</S.LikeCounter>
      </S.LikeWrap>

      <S.NameCategoryItem fSize={24} color={'grayDark'}>
        {engName}
      </S.NameCategoryItem>

      <S.DetailsWrap>
        <S.SizeIcon source={SIZE} />
        <S.DetailsBottomText fSize={13}>
          {categoryItem.size}
        </S.DetailsBottomText>

        <S.DownloadIcon source={DOWNLOAD_GRAY} />
        <S.DetailsBottomText fSize={13}>105k</S.DetailsBottomText>

        <S.VersionsIcon source={VERSION} />
        <S.DetailsBottomText fSize={13}>
          {categoryItem.version}
        </S.DetailsBottomText>
      </S.DetailsWrap>

      <S.DownloadWrap onPress={() => onDownloadPressed()}>
        <S.DownloadTextWrap>
          <S.DownloadText fSize={24} color={'light'}>
            {isExist
              ? 'Open'
              : isDownloading
              ? `Loading... ${percentage}%`
              : 'Download'}
          </S.DownloadText>

          {!isExist && !isDownloading && (
            <S.DownloadVideoIcon source={DOWNLOAD_VIDEO} />
          )}
        </S.DownloadTextWrap>

        <ProgressBar
          progress={isDownloading ? percentage / 100 : 1}
          width={null}
          height={48}
          color={theme.colors.green}
          unfilledColor={'#CCCCCC'}
          borderWidth={0}
          borderRadius={10}
        />
      </S.DownloadWrap>

      <Modal
        isVisible={isErrorModalVisible}
        backdropOpacity={0.3}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        onRequestClose={onPressBackButton}>
        <S.ErrorModalWrap>
          <S.Title fSize={26} fStyle={'caption700'}>
            Error
          </S.Title>
          <S.ErrorMessage fStyle={'caption400'} fSize={20}>
            Minecraft is not installed
          </S.ErrorMessage>
          <S.OkButtonWrap onPress={() => setIsErrorModalVisible(false)}>
            <S.OkButtonText fStyle={'caption700'} color={'green'} fSize={20}>
              OK
            </S.OkButtonText>
          </S.OkButtonWrap>
        </S.ErrorModalWrap>
      </Modal>
    </S.Container>
  );
}
