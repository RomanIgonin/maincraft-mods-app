import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';

export const getExistInfo = (
  categoryItem: CategoryItem,
  categoryType: CategoryType,
) => {
  const { existMods } = useModsStore();
  const { existMaps } = useMapsStore();
  const { existSkins } = useSkinsStore();
  const { existSeeds } = useSeedsStore();

  if (categoryType === 'mods') {
    return existMods.some(mod => mod.id === categoryItem.id);
  } else if (categoryType === 'maps') {
    return existMaps.some(map => map.id === categoryItem.id);
  } else if (categoryType === 'skins') {
    return existSkins.some(skin => skin.id === categoryItem.id);
  } else {
    return existSeeds.some(seed => seed.id === categoryItem.id);
  }
};
