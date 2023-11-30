import React, { useCallback } from 'react';
import { Route } from 'react-native-tab-view/src/types';
import UDRoutesTemplate from '@src/modules/ud-ui/components/ud-routes-template';
import { SceneMap } from 'react-native-tab-view';
import UDCategoryView from '@src/modules/ud-ui/components/ud-category-view';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

export default function SkinsScreen() {
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
      title: t('girls'),
    },
    {
      key: 'fourth',
      title: t('boys'),
    },
    {
      key: 'fifth',
      title: t('zombie'),
    },
  ];

  const FirstRoute = useCallback(() => {
    return <UDRoutesTemplate typeCategory={'skins'} />;
  }, []);

  const SecondRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'mob'} typeCategory={'skins'} />;
  }, []);

  const ThirdRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'female'} typeCategory={'skins'} />;
  }, []);

  const FourthRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'male'} typeCategory={'skins'} />;
  }, []);

  const FifthRoute = useCallback(() => {
    return <UDRoutesTemplate filterTag={'zombie'} typeCategory={'skins'} />;
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
      categoryType={'skins'}
    />
  );
}
