import React, { useEffect, useState } from 'react';
import * as S from './styles';
import {
  BG_NEW_ADDONS,
  BG_PREMIUM_TIME,
  BG_TOP_BAR,
  CROWN,
  DISCORD,
  MAGNIFIER,
} from '@src/assets/constants/imagePaths';
import screenNames from '@src/modules/navigation/screen-names';
import CategoryButtons from '@src/modules/main-menu/ui/components/category-button';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import { MOCK_MODS_DATA } from '@src/modules/main-menu/domain/constants/mockModsData';
import UDSelectionList from '@src/modules/ud-ui/components/ud-selection-list';
import UDCarouselSlider from '@src/modules/ud-ui/components/ud-carousel';
import WelcomeModal from '@src/modules/welcome-modal/ui/screens';
import { useNavigation } from '@react-navigation/native';

export default function MainMenuScreen() {
  const { loadMods, mods } = useModsStore();
  const { loadMaps, maps } = useMapsStore();
  const { loadSkins, skins } = useSkinsStore();
  const { loadSeeds } = useSeedsStore();

  const [isImageDelayLoading, setIsImageDelayLoading] = useState(true);

  const navigation = useNavigation<any>();

  useEffect(() => {
    setTimeout(() => {
      setIsImageDelayLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    loadMods();
    loadMaps();
    loadSkins();
    loadSeeds();
  }, []);

  const onPressSearch = () => {
    navigation.navigate(screenNames.search, { categoryType: 'mods' });
  };
  const onPressPremium = () => {
    navigation.navigate(screenNames.premium);
  };

  return (
    <S.Container showsVerticalScrollIndicator={false} bounces={false}>
      <S.HeaderBg source={BG_TOP_BAR}>
        <S.HeaderWrap>
          <S.PremiumWrap onPress={onPressPremium}>
            <S.CrownIcon source={CROWN} />
            <S.TimerBg source={BG_PREMIUM_TIME}>
              <S.Timer fStyle={'calibri700'} fSize={12} color={'light'}>
                48h:59m
              </S.Timer>
            </S.TimerBg>
          </S.PremiumWrap>

          <S.SearchWrap onPress={onPressSearch}>
            <S.SearchText fSize={15}>Search</S.SearchText>
            <S.Magnifier source={MAGNIFIER} />
          </S.SearchWrap>

          <S.DiscordIcon source={DISCORD} />
        </S.HeaderWrap>
      </S.HeaderBg>

      <S.ShadowCarousel isImageDelayLoading={isImageDelayLoading}>
        <UDCarouselSlider
          isImageDelayLoading={isImageDelayLoading}
          imageData={MOCK_MODS_DATA}
          height={177}
          categoryType={'mods'}
        />
      </S.ShadowCarousel>

      <CategoryButtons />

      <UDSelectionList
        title={'Top mods'}
        data={mods}
        categoryType={'mods'}
        isImageDelayLoading={isImageDelayLoading}
      />
      <UDSelectionList
        title={'Daily selection'}
        data={mods}
        categoryType={'mods'}
        isImageDelayLoading={isImageDelayLoading}
      />
      <UDSelectionList
        title={'Christmas'}
        data={mods}
        categoryType={'mods'}
        isImageDelayLoading={isImageDelayLoading}
      />

      <S.NewAddonsWrap>
        <S.ImageNewAddons source={BG_NEW_ADDONS}>
          <S.NewAddonsText fSize={24} color={'light'}>
            New addons every day
          </S.NewAddonsText>
        </S.ImageNewAddons>
      </S.NewAddonsWrap>

      <UDSelectionList
        title={'Top maps'}
        data={maps}
        categoryType={'maps'}
        isImageDelayLoading={isImageDelayLoading}
      />
      <UDSelectionList
        title={'Top skins'}
        data={skins}
        categoryType={'skins'}
        isImageDelayLoading={isImageDelayLoading}
      />

      <WelcomeModal />
    </S.Container>
  );
}
