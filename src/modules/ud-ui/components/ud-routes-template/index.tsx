import UDList from '@src/modules/ud-ui/components/ud-list';
import React from 'react';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import useModsStore from '@src/modules/mods/store';
import { useFilter } from '@src/modules/ud-ui/hooks/useFilter';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';

interface RouteProps {
  filterTag?: string;
  typeCategory: CategoryType;
}

function UDRoutesTemplate(props: RouteProps) {
  const { filterTag = '', typeCategory } = props;

  const { mods } = useModsStore();
  const { maps } = useMapsStore();
  const { skins } = useSkinsStore();
  const { seeds } = useSeedsStore();
  const { filterByTag } = useFilter();

  const dataResolver =
    typeCategory === 'mods'
      ? mods
      : typeCategory === 'maps'
      ? maps
      : typeCategory === 'skins'
      ? skins
      : seeds;

  const filteredDataByTag = filterByTag(dataResolver, filterTag);

  return <UDList typeCategory={typeCategory} data={filteredDataByTag} />;
}

export default UDRoutesTemplate;
