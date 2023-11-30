import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as S from './styles';
import { RouteProp } from '@react-navigation/native';
import UDDownloadContainer from '@src/modules/ud-ui/components/ud-download-container';
import UDDescription from '@src/modules/ud-ui/components/ud-description';
import useModsStore from '@src/modules/mods/store';
// import { RED_CIRCLE_ADS } from '@src/assets/constants/imagePaths';
import UDSelectionList from '@src/modules/ud-ui/components/ud-selection-list';
import { useFilter } from '@src/modules/ud-ui/hooks/useFilter';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
// import advertisingService from '@src/modules/advertising/services/AdvertisingService';
import useAdvertisingStore from '@src/modules/advertising/store';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
// import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
// import { Platform } from 'react-native';

type Props = {
  route?: RouteProp<
    {
      params: {
        categoryId: string;
        categoryType: CategoryType;
      };
    },
    'params'
  >;
};

export default function UDDetailsScreen({ route }: Props) {
  const { mods } = useModsStore();
  const { maps } = useMapsStore();
  const { skins } = useSkinsStore();
  const { seeds } = useSeedsStore();
  const { showAdDetailsScreen, setShowAdDetailsScreen } = useAdvertisingStore();

  const { t } = useAppTranslation(['main_menu']);

  const { filterBySimilar } = useFilter();
  const refScrollView = useRef<any>(null);

  const categoryId = route?.params.categoryId;
  const categoryType = route?.params.categoryType;

  const [isImageDelayLoading, setIsImageDelayLoading] = useState(true);
  const [itemId, setItemId] = useState<string>(categoryId || '');

  const isSkinsCategory = categoryType === 'skins';

  useEffect(() => {
    if (categoryId) {
      setItemId(categoryId);
    }
    refScrollView.current?.scrollTo({ x: 0, y: 0, animated: false });
  }, [categoryId]);

  useEffect(() => {
    setTimeout(() => {
      setIsImageDelayLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setShowAdDetailsScreen();
    if (showAdDetailsScreen) {
      //todo реклама отключена на время модерации
      // advertisingService.showInterstitial();
    }
  }, [setShowAdDetailsScreen, showAdDetailsScreen]);

  const resolver = useMemo(
    () => [
      { type: 'mods', data: mods },
      { type: 'maps', data: maps },
      { type: 'skins', data: skins },
      { type: 'seeds', data: seeds },
    ],
    [maps, mods, skins, seeds],
  );

  const categoryData = useMemo(
    () => resolver.find(i => i.type === categoryType),
    [categoryType, resolver],
  );

  const categoryItem = useMemo(() => {
    if (categoryData) {
      return categoryData.data.find(i => i.id === itemId);
    }
  }, [categoryData, itemId]);

  const similarItems = useMemo(
    () =>
      categoryData &&
      categoryItem &&
      filterBySimilar(categoryData.data, categoryItem),
    [categoryData, categoryItem, filterBySimilar],
  );

  const resolveList = useCallback(() => {
    if (categoryType === 'seeds') {
      if (mods) {
        return (
          <UDSelectionList
            title={t('top_mods')}
            data={mods}
            categoryType={'mods'}
            isImageDelayLoading={isImageDelayLoading}
          />
        );
      }
    } else {
      if (similarItems && categoryType) {
        return (
          <S.SimilarWrap>
            <UDSelectionList
              title={t('similar')}
              data={similarItems}
              categoryType={categoryType}
              isDetailsScreen={true}
            />
          </S.SimilarWrap>
        );
      }
    }
  }, [mods, similarItems, isImageDelayLoading, categoryType]);

  const Banner = () => {
    return (
      <>
        {/*TODO получить у заказчика unitId для ios и ios_app_id (вставить в app.json)
            На время сдачи релиза пока скроем баннеры*/}
        {/*<S.BannerWrap>*/}
        {/*  <BannerAd*/}
        {/*    unitId={*/}
        {/*      Platform.OS === 'android'*/}
        {/*        ? 'ca-app-pub-7721675788918719/7661301629'*/}
        {/*        : 'ca-app-pub-7721675788918719/1402019182'*/}
        {/*    }*/}
        {/*    size={BannerAdSize.MEDIUM_RECTANGLE}*/}
        {/*    onAdFailedToLoad={error => console.warn('error in BannerAd', error)}*/}
        {/*  />*/}
        {/*</S.BannerWrap>*/}

        {/*<S.RemoveAdsWrap>*/}
        {/*  <S.RemoveAds fSize={16}>Remove ads</S.RemoveAds>*/}
        {/*  <S.AdsWrap>*/}
        {/*    <S.Ads fSize={11}>ads</S.Ads>*/}
        {/*    <S.AdsIcon source={RED_CIRCLE_ADS} />*/}
        {/*  </S.AdsWrap>*/}
        {/*</S.RemoveAdsWrap>*/}
      </>
    );
  };

  if (categoryItem && categoryType) {
    return (
      <S.Container
        showsVerticalScrollIndicator={false}
        bounces={false}
        ref={refScrollView}>
        <UDDownloadContainer
          categoryItem={categoryItem}
          categoryType={categoryType}
          setItemId={setItemId}
        />

        {!isSkinsCategory && <Banner />}

        <S.DescriptionWrap>
          <UDDescription categoryItem={categoryItem} />
        </S.DescriptionWrap>

        {isSkinsCategory && <Banner />}

        {resolveList()}
      </S.Container>
    );
  }
}
