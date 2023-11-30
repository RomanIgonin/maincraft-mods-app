import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screenNames from '@src/modules/navigation/screen-names';
import TutorialScreen from '@src/modules/tutorial/ui/screens';
import { Dimensions, Image, ImageSourcePropType, View } from 'react-native';
import {
  HOME,
  MEME,
  SETTINGS,
  TUTORIAL,
} from '@src/assets/constants/imagePaths';
import { theme } from '@styles/theme';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { navigationRef } from '@src/modules/navigation/RootNavigation';
import { routingInstrumentation } from '@src/sentry/configure-sentry';
import MainMenuStack from '@src/modules/navigation/main-menu-stack';
import SettingsStack from '@src/modules/navigation/settings-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTranslation } from '../translations/domain/hooks/use-app-translation';
import analyticService from '../analytics/services/AnayticService';
import MemeStack from '@src/modules/navigation/meme-stack';

const { width, height } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const resolveIcon = (source: ImageSourcePropType) => {
  return {
    tabBarIcon: ({ focused }: any) => (
      <Image source={source} style={{ opacity: focused ? 1 : 0.6 }} />
    ),
  };
};

const screenOptions = {
  headerShown: false,
  tabBarStyle: {
    width: '100%',
    backgroundColor: theme.colors.green,
    height: 73,
    paddingHorizontal: 20,
    paddingBottom: 8,
    paddingTop: 10,
  },
  tabBarHideOnKeyboard: true,
  tabBarLabelStyle: {
    fontSize: 13,
    fontFamily: theme.fonts.pixel,
  },
  tabBarActiveTintColor: theme.colors.light,
  tabBarInactiveTintColor: '#c3ddc1',
};

/**
 * Resets tabs with stackNavigators to the first route when navigation to another tab
 */
// @ts-ignore
const resetTabStacksOnBlur = ({ navigation }) => ({
  blur: () => {
    const state = navigation.getState();
    // @ts-ignore
    state.routes.forEach((route, tabIndex) => {
      if (state?.index !== tabIndex && route.state?.index > 0) {
        navigation.dispatch(StackActions.popToTop());
      }
    });
  },
  focus: () => {
    const state = navigation.getState();
    const currentScreenName = state.routeNames[state.index];

    if (currentScreenName === 'Tutorial') {
      analyticService.reportEvent('start_tutorial');
    }
    if (currentScreenName === 'Home') {
      analyticService.reportEvent('start_menu');
    }
    if (currentScreenName === 'Meme') {
      analyticService.reportEvent('start_meme');
    }
  },
});

export default function BottomTabNavigator() {
  const { t } = useAppTranslation('shared');
  const onNavigationReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
  }, []);

  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <View
        style={{
          width,
          height,
          paddingBottom: insets.bottom,
          paddingTop: insets.top,
        }}>
        <Tab.Navigator
          initialRouteName={screenNames.mainMenu}
          // @ts-ignore
          screenOptions={screenOptions}>
          <Tab.Screen
            name={screenNames.mainMenu}
            component={MainMenuStack}
            options={{ ...resolveIcon(HOME), title: t('home') }}
            listeners={resetTabStacksOnBlur}
          />
          <Tab.Screen
            name={screenNames.tutorial}
            component={TutorialScreen}
            options={{ ...resolveIcon(TUTORIAL), title: t('tutorial') }}
            listeners={resetTabStacksOnBlur}
          />
          <Tab.Screen
            name={screenNames.meme}
            component={MemeStack}
            options={{ ...resolveIcon(MEME), title: t('meme') }}
            listeners={resetTabStacksOnBlur}
          />
          <Tab.Screen
            name={screenNames.settings}
            component={SettingsStack}
            options={{ ...resolveIcon(SETTINGS), title: t('settings') }}
            listeners={resetTabStacksOnBlur}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
