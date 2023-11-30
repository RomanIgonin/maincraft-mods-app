import React, { useCallback } from 'react';
import { SceneMap } from 'react-native-tab-view';
import UDRoutesTemplate from '@src/modules/ud-ui/components/ud-routes-template';
import UDCategoryView from '@src/modules/ud-ui/components/ud-category-view';
import { Route } from 'react-native-tab-view/src/types';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

export default function ModsScreen() {
  const { t } = useAppTranslation('shared');
  const tabViewRoutes: Route[] = [
    {
      key: 'first',
      title: t('all'),
    },
    {
      key: 'second',
      title: t('mobs'),
    },
    {
      key: 'third',
      title: t('weapon'),
    },
    {
      key: 'fourth',
      title: t('car'),
    },
    {
      key: 'fifth',
      title: t('zombie'),
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

  return (
    <UDCategoryView
      tabViewRoutes={tabViewRoutes}
      renderScene={renderScene}
      categoryType={'mods'}
    />
  );
}
