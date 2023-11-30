import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/theme';
import { BackHandler, SafeAreaView, StatusBar } from 'react-native';
import BottomTabNavigator from '@src/modules/navigation';
import {
  isAppMountedRef,
  navigationRef,
} from '@src/modules/navigation/RootNavigation';
import { configureSentry } from '@src/sentry/configure-sentry';
import * as Sentry from '@sentry/react-native';
import { PaperProvider } from 'react-native-paper';
import useWelcomeModalStore from '@src/modules/welcome-modal/store';
import useNotificationsStore from '@src/modules/notifications/store';
import OneSignal from 'react-native-onesignal';

configureSentry();

// TODO: подключить OneSignal ID для ios. Сейчас прописана для андроида.
OneSignal.setAppId('8169e67a-053c-430d-aa13-20574392d239');

const App = () => {
  const { loadEnterInAppCounter } = useWelcomeModalStore();
  const { checkNotification } = useNotificationsStore();

  useEffect(() => {
    loadEnterInAppCounter();
    checkNotification();
  }, []);

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
    <PaperProvider>
      <ThemeProvider theme={theme}>
        <StatusBar backgroundColor="#60A958" barStyle="light-content" />
        <SafeAreaView style={{ backgroundColor: theme.colors.green }}>
          <BottomTabNavigator />
        </SafeAreaView>
      </ThemeProvider>
    </PaperProvider>
  );
};

export default Sentry.wrap(App);
