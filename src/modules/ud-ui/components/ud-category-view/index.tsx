import React, { useCallback, useMemo, useState } from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import screenNames from '@src/modules/navigation/screen-names';
import UDTabView from '@src/modules/ud-ui/components/ud-tab-view';
import UDSortModal from '@src/modules/ud-sort/ui/screens';
import useModsStore from '@src/modules/mods/store';
import sortService from '@src/modules/ud-sort/domain/services/SortService';
import { useNavigation } from '@react-navigation/native';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { Route, SceneRendererProps } from 'react-native-tab-view/src/types';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import { capitalizeFirstLetter } from '@src/modules/ud-ui/helpers/capitalizeFirstLetter';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import useTranslationsStore from '@src/modules/translations/store';

type SceneProps = {
  route: any;
} & Omit<SceneRendererProps, 'layout'>;

interface Props {
  tabViewRoutes: Route[];
  renderScene: ({ route, jumpTo, position }: SceneProps) => React.JSX.Element;
  categoryType: CategoryType;
}

export default function UDCategoryView(props: Props) {
  const { mods, sortMods } = useModsStore();
  const { maps, sortMaps } = useMapsStore();
  const { skins, sortSkins } = useSkinsStore();
  const { currentLanguage } = useTranslationsStore();
  const { t } = useAppTranslation('shared');
  const { tabViewRoutes, renderScene, categoryType } = props;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const dataCategory = useMemo(() => {
    return categoryType === 'mods'
      ? mods
      : categoryType === 'maps'
      ? maps
      : skins;
  }, [categoryType]);

  const sortCategory = useMemo(() => {
    return categoryType === 'mods'
      ? sortMods
      : categoryType === 'maps'
      ? sortMaps
      : sortSkins;
  }, [categoryType]);

  const navigation = useNavigation<any>();

  const onPressArrowBack = useCallback(() => {
    navigateBack();
    sortService.sort(dataCategory, 'By default', 'Ascending', currentLanguage);
  }, [currentLanguage, dataCategory]);

  const onPressOptions = () => {
    setIsModalVisible(true);
  };

  const onPressSearch = useCallback(() => {
    navigation.navigate(screenNames.search, { categoryType: categoryType });
  }, [categoryType]);

  return (
    <>
      <S.Container>
        <UDHeader
          title={t(capitalizeFirstLetter(categoryType))}
          arrowBackButton={true}
          onPressArrowBack={onPressArrowBack}
          optionsButton={true}
          onPressOptions={onPressOptions}
          searchButton={true}
          onPressSearch={onPressSearch}
        />

        <UDTabView routes={tabViewRoutes} renderScene={renderScene} />
      </S.Container>

      <UDSortModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        sort={sortCategory}
      />
    </>
  );
}
