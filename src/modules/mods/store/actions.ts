import axios from 'axios';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import Config from 'react-native-config';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { ExistMods } from '@src/modules/mods/store/index';

export const getMods = async (): Promise<CategoryItem[]> => {
  const API_URL_MODS = Config.API_URL + 'asset/sorted/mods';
  const mods = await axios.get(API_URL_MODS);
  return await Promise.all(
    mods.data.map(async (mp: any) => {
      const filepath = DocumentDirectoryPath + '/' + mp.file.fullName;
      return { ...mp, filepath };
    }),
  );
};

export const getExistMods = async (
  mods: CategoryItem[],
): Promise<ExistMods[]> => {
  // TODO: replace to for await
  const existArr = await Promise.all(
    mods.map(async mod => {
      const filepath = DocumentDirectoryPath + '/' + mod.file.fullName;
      const isExist = await RNFS.exists(filepath);
      if (isExist) {
        return { id: mod.id } as ExistMods;
      }
    }),
  );
  return existArr.filter(item => item !== undefined) as ExistMods[];
};
