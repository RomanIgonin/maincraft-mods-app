import React from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { SceneMap } from 'react-native-tab-view';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import UDList from '@src/modules/ud-ui/components/ud-list';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import UDTabView from '@src/modules/ud-ui/components/ud-tab-view';
import likeListService from '@src/modules/your-like-list/domain/services/LikeListService';

export default function YourLikeListScreen() {
  const { mods } = useModsStore();
  const { maps } = useMapsStore();
  const { skins } = useSkinsStore();
  const { seeds } = useSeedsStore();

  const routes = [
    {
      key: 'first',
      title: 'Maps',
    },
    {
      key: 'second',
      title: 'Mods',
    },
    {
      key: 'third',
      title: 'Skins',
    },
    {
      key: 'fourth',
      title: 'Seeds',
    },
  ];

  const FirstRoute = () => {
    const data = likeListService.FilterLikedData(maps, 'maps');
    return <UDList typeCategory={'maps'} data={data} />;
  };

  const SecondRoute = () => {
    const data = likeListService.FilterLikedData(mods, 'mods');
    return <UDList typeCategory={'mods'} data={data} />;
  };

  const ThirdRoute = () => {
    const data = likeListService.FilterLikedData(skins, 'skins');
    return <UDList typeCategory={'skins'} data={data} />;
  };

  const FourthRoute = () => {
    const data = likeListService.FilterLikedData(seeds, 'seeds');
    return <UDList typeCategory={'seeds'} data={data} />;
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
  });

  const onPressArrowBack = () => {
    navigateBack();
  };

  return (
    <S.Container>
      <UDHeader
        title={'Your like list'}
        arrowBackButton={true}
        onPressArrowBack={onPressArrowBack}
      />
      <UDTabView
        routes={routes}
        renderScene={renderScene}
        isYourLikeList={true}
      />
    </S.Container>
  );
}
