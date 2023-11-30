import React, { useCallback } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screenNames from '@src/modules/navigation/screen-names';
import TutorialScreen from '@src/modules/tutorial/ui/screens';
import MemeScreen from '@src/modules/meme/ui/screens';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  Platform,
  View,
} from 'react-native';
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
import { getStatusBarHeight } from 'react-native-safearea-height';

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
    marginBottom: getStatusBarHeight(true),
  },
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
});

export default function BottomTabNavigator() {
  const onNavigationReady = useCallback(() => {
    routingInstrumentation.registerNavigationContainer(navigationRef);
  }, []);

  return (
    <NavigationContainer ref={navigationRef} onReady={onNavigationReady}>
      <View
        style={{
          width,
          height: Platform.OS === 'ios' ? height - 24 : '100%',
        }}>
        <Tab.Navigator
          initialRouteName={screenNames.mainMenu}
          // @ts-ignore
          screenOptions={screenOptions}>
          <Tab.Screen
            name={screenNames.mainMenu}
            component={MainMenuStack}
            options={resolveIcon(HOME)}
            listeners={resetTabStacksOnBlur}
          />
          <Tab.Screen
            name={screenNames.tutorial}
            component={TutorialScreen}
            options={resolveIcon(TUTORIAL)}
            listeners={resetTabStacksOnBlur}
          />
          <Tab.Screen
            name={screenNames.meme}
            component={MemeScreen}
            options={resolveIcon(MEME)}
            listeners={resetTabStacksOnBlur}
          />
          <Tab.Screen
            name={screenNames.settings}
            component={SettingsStack}
            options={resolveIcon(SETTINGS)}
            listeners={resetTabStacksOnBlur}
          />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
}
