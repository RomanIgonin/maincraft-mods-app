import axios from 'axios';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import Config from 'react-native-config';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { ExistMaps } from '@src/modules/maps/store/index';

export const getMaps = async (): Promise<CategoryItem[]> => {
  const API_URL_MAPS = Config.API_URL + 'asset/sorted/maps';
  const maps = await axios.get(API_URL_MAPS);

  return await Promise.all(
    maps.data.map(async (mp: any) => {
      const filepath = DocumentDirectoryPath + '/' + mp.fullName;
      return { ...mp, filepath };
    }),
  );
};

export const getExistMaps = async (
  maps: CategoryItem[],
): Promise<ExistMaps[] | []> => {
  // TODO: replace to for await
  const existArr = await Promise.all(
    maps.map(async map => {
      const filepath = DocumentDirectoryPath + '/' + map.file.fullName;
      const isExist = await RNFS.exists(filepath);
      if (isExist) {
        return { id: map.id } as ExistMaps;
      }
    }),
  );
  return existArr.filter(item => item !== undefined) as ExistMaps[];
};
