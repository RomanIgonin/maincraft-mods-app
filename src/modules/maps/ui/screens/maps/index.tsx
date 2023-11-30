import React, { useCallback, useState } from 'react';
import * as S from './styles';
import useMapsStore from '@src/modules/maps/store';
import { useNavigation } from '@react-navigation/native';
import UDRoutesTemplate from '@src/modules/ud-ui/components/ud-routes-template';
import { SceneMap } from 'react-native-tab-view';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import sortService from '@src/modules/ud-sort/domain/services/SortService';
import screenNames from '@src/modules/navigation/screen-names';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import UDTabView from '@src/modules/ud-ui/components/ud-tab-view';
import UDSortModal from '@src/modules/ud-sort/ui/screens';

export default function MapsScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { maps, sortMaps } = useMapsStore();

  const navigation = useNavigation<any>();

  const routes = [
    {
      key: 'first',
      title: 'All',
    },
    {
      key: 'second',
      title: 'Mobs',
    },
    {
      key: 'third',
      title: 'Weapon',
    },
    {
      key: 'fourth',
      title: 'Car',
    },
    {
      key: 'fifth',
      title: 'Zombie',
    },
  ];

  const FirstRoute = useCallback(() => {
    return <UDRoutesTemplate typeCategory={'maps'} />;
  }, []);

  const SecondRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'mob'} typeCategory={'maps'} />;
  }, []);

  const ThirdRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'weapon'} typeCategory={'maps'} />;
  }, []);

  const FourthRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'car'} typeCategory={'maps'} />;
  }, []);

  const FifthRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'zombie'} typeCategory={'maps'} />;
  }, []);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    fourth: FourthRoute,
    fifth: FifthRoute,
  });

  const onPressArrowBack = () => {
    navigateBack();
    sortService.sort(maps, 'By default', 'Ascending');
  };
  const onPressOptions = () => {
    setIsModalVisible(true);
  };
  const onPressSearch = () => {
    navigation.navigate(screenNames.search, { categoryType: 'maps' });
  };

  return (
    <>
      <S.Container>
        <UDHeader
          title={'Maps'}
          arrowBackButton={true}
          onPressArrowBack={onPressArrowBack}
          optionsButton={true}
          onPressOptions={onPressOptions}
          searchButton={true}
          onPressSearch={onPressSearch}
        />

        <UDTabView routes={routes} renderScene={renderScene} />
      </S.Container>

      <UDSortModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        sort={sortMaps}
      />
    </>
  );
}
