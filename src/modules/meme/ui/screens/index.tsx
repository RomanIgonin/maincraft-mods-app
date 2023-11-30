import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import {
  AppState,
  Dimensions,
  FlatList,
  ListRenderItem,
  Platform,
} from 'react-native';
import { LOGO, SHARE_FILL, VERIFIED } from '@src/assets/constants/imagePaths';
import Config from 'react-native-config';
import { UDText } from '@styles/typography';
import likeService from '@src/modules/your-like-list/domain/services/LikeService';
import storageService from '@src/modules/core/services/StorageService';
import { useShare } from '@src/modules/ud-ui/hooks/useShare';
// import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { useNavigation } from '@react-navigation/native';
import screenNames from '@src/modules/navigation/screen-names';
import useMemeStore from '@src/modules/meme/store';
import { Meme } from '@src/modules/meme/domain/interfaces/Meme';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import useTranslationsStore from '@src/modules/translations/store';

const widthScreen = Dimensions.get('screen').width;

export default function MemeScreen() {
  const { share } = useShare();
  const navigation = useNavigation<any>();
  const [likedListIds, setLikedListIds] = useState<string[]>([]);
  const refFlatList = useRef<any>(null);
  const { linkMemeId, removeLinkMemeId, meme, putLike, deleteLike } =
    useMemeStore();
  const { currentLanguage } = useTranslationsStore();

  const { t } = useAppTranslation('shared');

  useEffect(() => {
    AppState.addEventListener('change', status => {
      if (status === 'background') {
        removeLinkMemeId();
      }
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      scrollToIndex();
    }, 200);
  }, [linkMemeId]);

  useEffect(() => {
    getData().then();
  }, []);

  const getData = async () => {
    await storageService.getData('meme').then(res => {
      if (res) {
        setLikedListIds(res as string[]);
      }
    });
  };

  const scrollToIndex = useCallback(() => {
    if (linkMemeId) {
      const indexMeme = meme.findIndex(obj => obj._id === linkMemeId);
      if (indexMeme >= 0) {
        refFlatList.current?.scrollToIndex({
          index: indexMeme,
          animated: false,
        });
      }
    }
  }, [linkMemeId, meme]);

  const isLikePress = likeService.checkIsLikePress;
  const isLikeInList = likeService.checkLikeInListIds;

  const onPressDownload = useCallback(
    (itemId: string, itemType: CategoryType) => {
      navigation.navigate(screenNames.udDetailsScreen, {
        categoryId: itemId,
        categoryType: itemType,
      });
    },
    [navigation],
  );

  const keyExtractor = (item: Meme) => item.itemId;

  const renderItem: ListRenderItem<Meme> = useCallback(
    ({ item, index }) => {
      const urlImage = item.picture.url;
      const memeHtml =
        currentLanguage && currentLanguage === 'en'
          ? item.desc.en
          : item.desc.ru;
      const isLiked = isLikePress(item._id, likedListIds);

      // TODO: На время сдачи релиза пока скроем баннеры
      // const showBanner = index % 2 === 0;

      const isLastItem = index === meme.length - 1;

      const onPressLike = async () => {
        await likeService.setIdLikedItem(item._id, likedListIds, 'meme');
        if (isLiked) {
          await deleteLike(item._id);
        } else {
          await putLike(item._id);
        }
        await getData();
      };

      const onPressShare = async () => {
        const appUrl = 'https://maincraftmodsapp.page.link';
        const urlShare = appUrl + '/meme/' + String(item._id);
        await share('', urlShare);
      };

      return (
        <>
          <S.RenderItemWrap isLastItem={isLastItem}>
            <S.Label>
              <S.DisplayPicture source={LOGO} />
              <S.LabelText fSize={16} fStyle={'caption700'}>
                AddMods
              </S.LabelText>
              <S.VerifiedIcon source={VERIFIED} />
            </S.Label>

            <S.PostTextWrap>
              <S.RenderHtmlText
                contentWidth={widthScreen}
                source={{ html: memeHtml }}
                defaultTextProps={{
                  style: {
                    fontFamily: Platform.select({
                      ios: 'PT Sans Caption',
                      android: 'PTSansCaption-Regular',
                    }),
                    letterSpacing: -0.6,
                    fontSize: 15,
                    lineHeight: 20,
                  },
                }}
              />
            </S.PostTextWrap>

            <S.PostImage source={{ uri: urlImage }} resizeMode={'contain'} />

            <S.ButtonsWrap>
              {item.itemId && (
                <S.DownloadButton
                  onPress={() =>
                    onPressDownload(item.itemId, item.categoryType)
                  }>
                  <UDText color={'light'} fSize={14}>
                    {t('DOWNLOAD')}
                  </UDText>
                </S.DownloadButton>
              )}

              <S.LikeButton onPress={() => onPressLike()} isLikePress={isLiked}>
                <S.LikeIcon
                  source={isLikeInList(item._id, likedListIds)}
                  resizeMode={'contain'}
                />
                <S.LikeText
                  fSize={14}
                  isLikePress={isLikePress(item._id, likedListIds)}>
                  {item.likes}
                </S.LikeText>
              </S.LikeButton>

              <S.ShareButton onPress={() => onPressShare()}>
                <S.ShareIcon source={SHARE_FILL} />
              </S.ShareButton>
            </S.ButtonsWrap>
          </S.RenderItemWrap>

          {/*TODO: На время сдачи релиза пока скроем баннеры*/}
          {/*{showBanner && !isLastItem && (*/}
          {/*  <S.BannerWrap>*/}
          {/*    <BannerAd*/}
          {/*      unitId={*/}
          {/*        Platform.OS === 'android'*/}
          {/*          ? 'ca-app-pub-7721675788918719/7661301629'*/}
          {/*          : 'ca-app-pub-7721675788918719/1402019182'*/}
          {/*      }*/}
          {/*      size={BannerAdSize.MEDIUM_RECTANGLE}*/}
          {/*      onAdFailedToLoad={error =>*/}
          {/*        console.warn('error in BannerAd', error)*/}
          {/*      }*/}
          {/*    />*/}
          {/*  </S.BannerWrap>*/}
          {/*)}*/}
        </>
      );
    },
    [
      currentLanguage,
      deleteLike,
      isLikeInList,
      isLikePress,
      likedListIds,
      meme.length,
      onPressDownload,
      putLike,
      share,
      t,
    ],
  );

  return (
    <S.Container>
      <S.HeaderShadow>
        <UDHeader title={t('meme')} discordButton={true} />
      </S.HeaderShadow>

      <FlatList
        ref={refFlatList}
        showsVerticalScrollIndicator={false}
        data={meme}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScrollToIndexFailed={info => {
          console.warn('onScrollToIndexFailed', info);
        }}
      />
    </S.Container>
  );
}
