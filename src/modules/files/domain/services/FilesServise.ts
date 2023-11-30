import Config from 'react-native-config';
import axios from 'axios';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

export class FilesService {
  putDownload = async (
    categoryType: CategoryType,
    itemId: string,
  ): Promise<CategoryItem | undefined> => {
    try {
      const API_URL_DOWNLOAD = Config.API_URL + 'asset/downloads/' + itemId;
      const result = await axios.put(API_URL_DOWNLOAD);
      return result.data;
    } catch (error) {
      console.warn('error in putDownload', error);
    }
  };
}

const filesService = new FilesService();
export default filesService;
