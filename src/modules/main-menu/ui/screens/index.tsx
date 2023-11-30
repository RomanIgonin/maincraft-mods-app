import React, { useEffect, useState } from 'react';
import * as S from './styles';
import {
  BG_MEME,
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
import UDSelectionList from '@src/modules/ud-ui/components/ud-selection-list';
import UDCarouselSlider from '@src/modules/ud-ui/components/ud-carousel';
import WelcomeModal from '@src/modules/welcome-modal/ui/screens';
import { useNavigation } from '@react-navigation/native';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert, Linking, View } from 'react-native';
import { theme } from '@src/styles/theme';
import analyticService from '@src/modules/analytics/services/AnayticService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import useCarouselStore from '@src/modules/carousel/store';

export default function MainMenuScreen() {
  const { mods, isModsLoading, dailySelectionMods, isDailySelectionLoading } =
    useModsStore();
  const { maps, isMapsLoading } = useMapsStore();
  const { skins, isSkinsLoading } = useSkinsStore();
  const { carousel, isCarouselLoading } = useCarouselStore();

  const [isImageDelayLoading, setIsImageDelayLoading] = useState(true);

  const navigation = useNavigation<any>();

  const { t } = useAppTranslation(['main_menu', 'shared']);

  useEffect(() => {
    setTimeout(() => {
      setIsImageDelayLoading(false);
    }, 500);
  }, []);

  const insets = useSafeAreaInsets();

  useEffect(() => {
    analyticService.reportEvent('start_menu');
  }, []);

  const onPressSearch = () => {
    navigation.navigate(screenNames.search, { categoryType: 'mods' });
  };
  // TODO: На время сдачи релиза пока скроем упоминания о премиуме
  // const onPressPremium = () => {
  // В MC-55 добавлен модуль subscription, в нем реализована верстка и почти вся логика премиум модалки.
  //   navigation.navigate(screenNames.premium);
  // };

  const onPressDiscord = async () => {
    const urlDiscord = 'https://discord.com/';
    const supported = await Linking.canOpenURL(urlDiscord);
    if (supported) {
      analyticService.reportEvent('discord_menu');
      await Linking.openURL(urlDiscord);
    } else {
      Alert.alert(`Don't know how to open this URL: ${urlDiscord}`);
    }
  };

  return (
    <S.Container
      showsVerticalScrollIndicator={false}
      bounces={false}
      insets={insets}>
      <View style={{ flex: 1, backgroundColor: theme.colors.backgroundLight }}>
        <S.HeaderBg source={BG_TOP_BAR}>
          <S.HeaderWrap>
            {/*<S.PremiumWrap onPress={onPressPremium}>*/}
            {/*  <S.CrownIcon source={CROWN} />*/}
            {/*  <S.TimerBg source={BG_PREMIUM_TIME}>*/}
            {/*    <S.Timer fStyle={'calibri700'} fSize={12} color={'light'}>*/}
            {/*      48h:59m*/}
            {/*    </S.Timer>*/}
            {/*  </S.TimerBg>*/}
            {/*</S.PremiumWrap>*/}

            <S.SearchWrap onPress={onPressSearch}>
              <S.SearchText fSize={15}>{t('search')}</S.SearchText>
              <S.Magnifier source={MAGNIFIER} />
            </S.SearchWrap>
            <TouchableOpacity
              onPress={onPressDiscord}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <S.DiscordIcon source={DISCORD} />
            </TouchableOpacity>
          </S.HeaderWrap>
        </S.HeaderBg>

        <S.ShadowCarousel
          isImageDelayLoading={isImageDelayLoading || isCarouselLoading}>
          <UDCarouselSlider
            isImageDelayLoading={isImageDelayLoading || isCarouselLoading}
            imageData={carousel}
            height={177}
            isPressable={true}
          />
        </S.ShadowCarousel>

        <CategoryButtons />

        <S.BannerMemeWrap
          activeOpacity={1}
          onPress={() => {
            navigation.navigate(screenNames.meme);
          }}>
          <S.BannerMeme source={BG_MEME} resizeMode={'stretch'} />
        </S.BannerMemeWrap>

        <UDSelectionList
          title={t('top_mods')}
          data={mods}
          categoryType={'mods'}
          isImageDelayLoading={isImageDelayLoading || isModsLoading}
        />
        <UDSelectionList
          title={t('daily')}
          data={dailySelectionMods}
          categoryType={'mods'}
          isImageDelayLoading={isImageDelayLoading || isDailySelectionLoading}
        />
        <UDSelectionList
          title={t('christmas')}
          data={mods}
          categoryType={'mods'}
          isImageDelayLoading={isImageDelayLoading || isModsLoading}
        />

        <S.NewAddonsWrap>
          <S.ImageNewAddons source={BG_NEW_ADDONS}>
            <S.NewAddonsText color={'light'}>
              {t('new_addons').split('<br/>').join('\n')}
            </S.NewAddonsText>
          </S.ImageNewAddons>
        </S.NewAddonsWrap>

        <UDSelectionList
          title={t('top_maps')}
          data={maps}
          categoryType={'maps'}
          isImageDelayLoading={isImageDelayLoading || isMapsLoading}
        />
        <UDSelectionList
          title={t('top_skins')}
          data={skins}
          categoryType={'skins'}
          isImageDelayLoading={isImageDelayLoading || isSkinsLoading}
        />

        <WelcomeModal />
      </View>
    </S.Container>
  );
}
