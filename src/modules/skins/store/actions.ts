import axios from 'axios';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import Config from 'react-native-config';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { ExistSkins } from '@src/modules/skins/store/index';

export const getSkins = async (): Promise<CategoryItem[]> => {
  const API_URL_SKINS = Config.API_URL + 'asset/sorted/skins';

  const skins = await axios.get(API_URL_SKINS);
  return await Promise.all(
    skins.data.map(async (mp: any) => {
      const filepath = DocumentDirectoryPath + '/' + mp.fullName;
      return { ...mp, filepath };
    }),
  );
};

export const getExistSkins = async (
  skins: CategoryItem[],
): Promise<ExistSkins[] | []> => {
  // TODO: replace to for await
  const existArr = await Promise.all(
    skins.map(async skin => {
      const filepath = DocumentDirectoryPath + '/' + skin.file.fullName;
      const isExist = await RNFS.exists(filepath);
      if (isExist) {
        return { id: skin.id } as ExistSkins;
      }
    }),
  );
  return existArr.filter(item => item !== undefined) as ExistSkins[];
};
