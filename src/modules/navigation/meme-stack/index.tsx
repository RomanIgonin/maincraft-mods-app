import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenNames from '../screen-names';
import { renderContent } from '@src/modules/navigation/main-menu-stack/helper';
import MemeScreen from '@src/modules/meme/ui/screens';

const Stack = createStackNavigator();

export default function MemeStack() {
  return (
    <Stack.Navigator
      initialRouteName={screenNames.meme}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={screenNames.settings} component={MemeScreen} />
      {renderContent()}
    </Stack.Navigator>
  );
}
