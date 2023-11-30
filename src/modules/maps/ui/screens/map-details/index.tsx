import React, { useState } from 'react';
import * as S from './styles';
import { RouteProp } from '@react-navigation/native';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import UDDownloadContainer from '@src/modules/ud-ui/components/ud-download-container';
import UDDescription from '@src/modules/ud-ui/components/ud-description';
import { RED_CIRCLE_ADS } from '@src/assets/constants/imagePaths';
import { UDText } from '@styles/typography';
import UDSelectionList from '@src/modules/ud-ui/components/ud-selection-list';
import { useFilter } from '@src/modules/ud-ui/hooks/useFilter';
import useMapsStore from '@src/modules/maps/store';

type Props = {
  route: RouteProp<
    {
      params: {
        categoryItem: CategoryItem;
      };
    },
    'params'
  >;
};

export default function MapDetailsScreen({ route }: Props) {
  const { maps, refreshMaps } = useMapsStore();
  const { filterBySimilar } = useFilter();

  const { engName } = route.params.categoryItem;

  const mapsSelectedItem = maps.find(item => {
    return item.engName === engName;
  });

  const similarItems = filterBySimilar(maps, mapsSelectedItem);

  const [isRewardedVideoOpen, setIsRewardedVideoOpen] =
    useState<boolean>(false);

  return (
    <S.Container showsVerticalScrollIndicator={false}>
      <UDDownloadContainer
        categoryItem={mapsSelectedItem}
        setIsRewardedVideoOpen={setIsRewardedVideoOpen}
        refresh={refreshMaps}
        categoryType={'maps'}
      />

      <S.BannerWrap>
        <S.Banner>BANNER</S.Banner>
      </S.BannerWrap>

      <S.RemoveAdsWrap>
        <S.RemoveAds fSize={16}>Remove ads</S.RemoveAds>
        <S.AdsWrap>
          <S.Ads fSize={11}>ads</S.Ads>
          <S.AdsIcon source={RED_CIRCLE_ADS} />
        </S.AdsWrap>
      </S.RemoveAdsWrap>

      <S.DescriptionWrap>
        <UDDescription />
      </S.DescriptionWrap>

      <S.SimilarWrap>
        <UDSelectionList
          title={'Similar'}
          data={similarItems}
          categoryType={'maps'}
          isDetailsScreen={true}
        />
      </S.SimilarWrap>

      {isRewardedVideoOpen && (
        <S.RewardedVideoWrap>
          <UDText>Скоро здесь появится рекламный ролик на 15-20 секунд</UDText>
        </S.RewardedVideoWrap>
      )}
    </S.Container>
  );
}
