import screenNames from '@src/modules/navigation/screen-names';
import YourLikeListScreen from '@src/modules/your-like-list/ui/screens';
import SearchScreen from '@src/modules/search/ui/screens';
import MapsScreen from '@src/modules/maps/ui/screens';
import ModsScreen from '@src/modules/mods/ui/screens';
import SkinsScreen from '@src/modules/skins/ui/screens';
import SeedsScreen from '@src/modules/seeds/ui/screens';
import UDDetailsScreen from '@src/modules/ud-ui/components/ud-details-screen';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Animated } from 'react-native';

const Stack = createStackNavigator();

const forFade = (props: {
  current: { progress: Animated.AnimatedInterpolation<number> };
}) => ({
  cardStyle: {
    opacity: props.current.progress,
  },
});

export const renderContent = () => {
  return (
    <>
      <Stack.Screen
        name={screenNames.yourLikeList}
        component={YourLikeListScreen}
      />
      <Stack.Screen
        name={screenNames.search}
        component={SearchScreen}
        options={{
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen name={screenNames.maps} component={MapsScreen} />
      <Stack.Screen name={screenNames.mods} component={ModsScreen} />
      <Stack.Screen name={screenNames.skins} component={SkinsScreen} />
      <Stack.Screen name={screenNames.seeds} component={SeedsScreen} />
      <Stack.Screen
        name={screenNames.udDetailsScreen}
        component={UDDetailsScreen}
      />
    </>
  );
};
