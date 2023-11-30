import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenNames from '../screen-names';
import SettingsScreen from '@src/modules/settings/ui/screens';
import AboutAppScreen from '@src/modules/settings/ui/screens/about-app';
import { renderContent } from '@src/modules/navigation/main-menu-stack/helper';

const Stack = createStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      initialRouteName={screenNames.settings}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screenNames.settings} component={SettingsScreen} />
      <Stack.Screen name={screenNames.aboutApp} component={AboutAppScreen} />
      {renderContent()}
    </Stack.Navigator>
  );
}
