import React, { useCallback } from 'react';
import UDRoutesTemplate from '@src/modules/ud-ui/components/ud-routes-template';
import { SceneMap } from 'react-native-tab-view';
import UDCategoryView from '@src/modules/ud-ui/components/ud-category-view';
import { Route } from 'react-native-tab-view/src/types';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

export default function MapsScreen() {
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
    return <UDRoutesTemplate typeCategory={'maps'} />;
  }, []);

  const SecondRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'mob'} typeCategory={'maaps'} />;
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

  return (
    <UDCategoryView
      tabViewRoutes={tabViewRoutes}
      renderScene={renderScene}
      categoryType={'maps'}
    />
  );
}
