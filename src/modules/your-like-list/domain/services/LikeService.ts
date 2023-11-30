import Config from 'react-native-config';
import axios from 'axios';
import storageService from '@src/modules/core/services/StorageService';
import { LIKE_GRAY, LIKE_RED } from '@src/assets/constants/imagePaths';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

export class LikeService {
  putLike = async (itemId: string): Promise<CategoryItem | undefined> => {
    try {
      const API_URL_LIKE = Config.API_URL + 'asset/likes/' + itemId;
      const result = await axios.put(API_URL_LIKE);
      return result.data;
    } catch (error) {
      console.warn('error in putLike', error);
    }
  };

  deleteLike = async (itemId: string): Promise<CategoryItem | undefined> => {
    try {
      const API_URL_LIKE = Config.API_URL + 'asset/unlike/' + itemId;
      const result = await axios.put(API_URL_LIKE);
      return result.data;
    } catch (error) {
      console.warn('error in deleteLike', error);
    }
  };

  public async setIdLikedItem(
    itemId: any,
    likedListIds: string[],
    category: string,
  ) {
    if (itemId) {
      if (likedListIds.includes(itemId)) {
        const filteredLikedList = likedListIds.filter(id => id !== itemId);
        await storageService.setData(category, filteredLikedList);
      } else {
        await storageService.setData(category, [...likedListIds, itemId]);
      }
    }
  }

  public checkLikeInListIds(itemId: any, likedListIds: string[]) {
    return likedListIds.length > 0
      ? likedListIds.includes(itemId)
        ? LIKE_RED
        : LIKE_GRAY
      : LIKE_GRAY;
  }

  public checkIsLikePress(itemId: string, likedListIds: string[]) {
    return likedListIds.length > 0 ? likedListIds.includes(itemId) : false;
  }
}

const likeService = new LikeService();
export default likeService;
