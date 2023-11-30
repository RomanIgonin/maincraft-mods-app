import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import screenNames from '../screen-names';
import MainMenuScreen from '@src/modules/main-menu/ui/screens';
import SearchScreen from '@src/modules/search/ui/screens';
import PremiumScreen from '@src/modules/premium/ui/screens';
import ModsScreen from '@src/modules/mods/ui/screens/mods';
import YourLikeListScreen from '@src/modules/your-like-list/ui/screens';
import MapsScreen from '@src/modules/maps/ui/screens/maps';
import SkinsScreen from '@src/modules/skins/ui/screens';
import SeedsScreen from '@src/modules/seeds/ui/screens';
import ModDetailsScreen from '@src/modules/mods/ui/screens/mod-details';
import MapDetailsScreen from '@src/modules/maps/ui/screens/map-details';

const Stack = createStackNavigator();

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

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
        name={screenNames.search}
        component={SearchScreen}
        options={{
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen name={screenNames.premium} component={PremiumScreen} />
      <Stack.Screen
        name={screenNames.yourLikeList}
        component={YourLikeListScreen}
      />
      <Stack.Screen name={screenNames.maps} component={MapsScreen} />
      <Stack.Screen
        name={screenNames.mapDetailsScreen}
        component={MapDetailsScreen}
      />
      <Stack.Screen name={screenNames.mods} component={ModsScreen} />
      <Stack.Screen
        name={screenNames.modDetailsScreen}
        component={ModDetailsScreen}
      />
      <Stack.Screen name={screenNames.skins} component={SkinsScreen} />
      <Stack.Screen name={screenNames.seeds} component={SeedsScreen} />
    </Stack.Navigator>
  );
}
