import React, { useCallback, useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { BackHandler, Linking, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from '@src/modules/navigation';
import {
  isAppMountedRef,
  navigate,
  navigationRef,
} from '@src/modules/navigation/RootNavigation';
import { configureSentry } from '@src/sentry/configure-sentry';
import * as Sentry from '@sentry/react-native';
import { PaperProvider } from 'react-native-paper';
import useWelcomeModalStore from '@src/modules/welcome-modal/store';
import useNotificationsStore from '@src/modules/notifications/store';
import { OneSignal } from 'react-native-onesignal';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import screenNames from '@src/modules/navigation/screen-names';
// @ts-ignore
import { debounce } from 'lodash';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import useModsStore from '@src/modules/mods/store';
import useSkinsStore from '@src/modules/skins/store';
import useMapsStore from '@src/modules/maps/store';
import useSeedsStore from '@src/modules/seeds/store';
import advertisingService from '@src/modules/advertising/services/AdvertisingService';
import Config from 'react-native-config';
import { TestMode } from '@src/modules/test-mode/ui';
import useMemeStore from '@src/modules/meme/store';
import useTranslationsStore from '@src/modules/translations/store';
import useCarouselStore from '@src/modules/carousel/store';
import useHintsStore from '@src/modules/search/store';

configureSentry();

OneSignal.initialize(Config.ONESIGNAL_APP_ID as string);

advertisingService.init();

const App = () => {
  const { loadEnterInAppCounter } = useWelcomeModalStore();
  const { checkNotification } = useNotificationsStore();

  const { loadMods, getDailySelection } = useModsStore();
  const { loadMaps } = useMapsStore();
  const { loadSkins } = useSkinsStore();
  const { loadSeeds } = useSeedsStore();
  const { setLinkMemeId, loadMemes } = useMemeStore();
  const { loadTranslations } = useTranslationsStore();
  const { loadCarousel } = useCarouselStore();
  const { loadHints } = useHintsStore();

  const handleDynamicLink = debounce((link: string) => {
    const categoryType: CategoryType | 'meme' | '' = link.includes('mods/')
      ? 'mods'
      : link.includes('maps/')
      ? 'maps'
      : link.includes('skins/')
      ? 'skins'
      : link.includes('seeds/')
      ? 'seeds'
      : link.includes('meme/')
      ? 'meme'
      : '';
    const r = link.split('/');
    const b = r[r.length - 1];

    if (categoryType === 'meme') {
      setLinkMemeId(b);
      navigate(screenNames.meme);
    } else {
      navigate(screenNames.udDetailsScreen, {
        categoryId: b,
        categoryType,
      });
    }
  }, 500);

  const getDynamicLink = useCallback(async () => {
    dynamicLinks().onLink(link => {
      link && handleDynamicLink(link.url);
    });

    const link = await Linking.getInitialURL();

    if (link) {
      const _link = await dynamicLinks().resolveLink(link);
      handleDynamicLink(_link.url);
    }
  }, [handleDynamicLink]);

  const loadAll = async () => {
    await loadTranslations();
    await loadCarousel();
    await loadMods();
    await getDailySelection();
    await loadMaps();
    await loadSkins();
    await loadHints();
    await loadMemes();
    await loadSeeds();
  };

  useEffect(() => {
    loadAll();
  }, []);

  useEffect(() => {
    getDynamicLink();
  }, [getDynamicLink]);

  useEffect(() => {
    loadEnterInAppCounter();
    checkNotification();
  }, [checkNotification, loadEnterInAppCounter]);

  useEffect(() => {
    const onBackPress = () => !navigationRef.current?.canGoBack();
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    (isAppMountedRef as any).current = true;

    return () => {
      (isAppMountedRef as any).current = false;
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  }, []);

  return (
    <SafeAreaProvider style={{ backgroundColor: theme.colors.green }}>
      <PaperProvider>
        <ThemeProvider theme={theme}>
          <StatusBar backgroundColor="#60A958" barStyle="light-content" />

          <BottomTabNavigator />
          <TestMode />
        </ThemeProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

export default Sentry.wrap(App);
