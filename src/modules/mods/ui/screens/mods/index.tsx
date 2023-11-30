import React, { useCallback, useState } from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import screenNames from '@src/modules/navigation/screen-names';
import UDTabView from '@src/modules/ud-ui/components/ud-tab-view';
import { SceneMap } from 'react-native-tab-view';
import UDRoutesTemplate from '@src/modules/ud-ui/components/ud-routes-template';
import UDSortModal from '@src/modules/ud-sort/ui/screens';
import useModsStore from '@src/modules/mods/store';
import sortService from '@src/modules/ud-sort/domain/services/SortService';
import { useNavigation } from '@react-navigation/native';

export default function ModsScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const { mods, sortMods } = useModsStore();

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
    return <UDRoutesTemplate typeCategory={'mods'} />;
  }, []);

  const SecondRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'mob'} typeCategory={'mods'} />;
  }, []);

  const ThirdRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'weapon'} typeCategory={'mods'} />;
  }, []);

  const FourthRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'car'} typeCategory={'mods'} />;
  }, []);

  const FifthRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'zombie'} typeCategory={'mods'} />;
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
    sortService.sort(mods, 'By default', 'Ascending');
  };
  const onPressOptions = () => {
    setIsModalVisible(true);
  };
  const onPressSearch = () => {
    navigation.navigate(screenNames.search, { categoryType: 'mods' });
  };

  return (
    <>
      <S.Container>
        <UDHeader
          title={'Mods'}
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
        sort={sortMods}
      />
    </>
  );
}
