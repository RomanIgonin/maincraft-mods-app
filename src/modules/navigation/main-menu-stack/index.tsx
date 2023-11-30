import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenNames from '../screen-names';
import MainMenuScreen from '@src/modules/main-menu/ui/screens';
import DailySelectionScreen from '@src/modules/daily-selection/ui';
import { renderContent } from '@src/modules/navigation/main-menu-stack/helper';

const Stack = createStackNavigator();

export default function MainMenuStack() {
  return (
    <Stack.Navigator
      initialRouteName={screenNames.mainMenuNavigator}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name={screenNames.mainMenuNavigator}
        component={MainMenuScreen}
      />
      <Stack.Screen
        name={screenNames.dailySelection}
        component={DailySelectionScreen}
      />
      {renderContent()}
    </Stack.Navigator>
  );
}
