import axios from 'axios';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import Config from 'react-native-config';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { ExistSeeds } from '@src/modules/seeds/store/index';

export const getSeeds = async (): Promise<CategoryItem[]> => {
  const API_URL_SEEDS = Config.API_URL + '/seeds/main.json';

  const seeds = await axios.get(API_URL_SEEDS);

  return await Promise.all(
    seeds.data.addons.map(async (mp: any) => {
      const filepath = DocumentDirectoryPath + '/' + mp.fileName;
      return { ...mp, filepath };
    }),
  );
};

export const getExistSeeds = async (
  seeds: CategoryItem[],
): Promise<ExistSeeds[] | []> => {
  const existArr = await Promise.all(
    seeds.map(async seed => {
      const filepath = DocumentDirectoryPath + '/' + seed.fileName;
      const isExist = await RNFS.exists(filepath);
      if (isExist) {
        return { id: seed.id };
      }
    }),
  );
  const existSeeds = existArr.filter(item => item !== undefined);
  return existSeeds;
};
