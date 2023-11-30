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
import useLikeList from '@src/modules/your-like-list/domain/hooks/useLikeList';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

export default function YourLikeListScreen() {
  const { mods } = useModsStore();
  const { maps } = useMapsStore();
  const { skins } = useSkinsStore();
  const { seeds } = useSeedsStore();

  const { t } = useAppTranslation('shared');

  const routes = [
    {
      key: 'first',
      title: t('Maps'),
    },
    {
      key: 'second',
      title: t('Mods'),
    },
    {
      key: 'third',
      title: t('Skins'),
    },
    {
      key: 'fourth',
      title: t('Seeds'),
    },
  ];

  const FirstRoute = () => {
    const { likedData } = useLikeList({ data: maps, category: 'maps' });
    return <UDList typeCategory={'maps'} data={likedData} />;
  };

  const SecondRoute = () => {
    const { likedData } = useLikeList({ data: mods, category: 'mods' });
    return <UDList typeCategory={'mods'} data={likedData} />;
  };

  const ThirdRoute = () => {
    const { likedData } = useLikeList({ data: skins, category: 'skins' });
    return <UDList typeCategory={'skins'} data={likedData} />;
  };

  const FourthRoute = () => {
    const { likedData } = useLikeList({ data: seeds, category: 'seeds' });
    return <UDList typeCategory={'seeds'} data={likedData} />;
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
        title={t('your_like_list')}
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
