import axios from 'axios';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import Config from 'react-native-config';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { ExistMods } from '@src/modules/mods/store/index';

export const getMods = async (): Promise<CategoryItem[]> => {
  const API_URL_MODS = Config.API_URL + '/mods/main.json';

  const mods = await axios.get(API_URL_MODS);

  return await Promise.all(
    mods.data.addons.map(async (mp: any) => {
      const filepath = DocumentDirectoryPath + '/' + mp.fileName;
      return { ...mp, filepath };
    }),
  );
};

export const getExistMods = async (
  mods: CategoryItem[],
): Promise<ExistMods[] | []> => {
  const existArr = await Promise.all(
    mods.map(async mod => {
      const filepath = DocumentDirectoryPath + '/' + mod.fileName;
      const isExist = await RNFS.exists(filepath);
      if (isExist) {
        return { id: mod.id };
      }
    }),
  );
  const existMods = existArr.filter(item => item !== undefined);
  return existMods;
};
