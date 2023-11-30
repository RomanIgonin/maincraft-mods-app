import storageService from '@src/modules/core/services/StorageService';
import { LIKE_GRAY, LIKE_RED } from '@src/assets/constants/imagePaths';

export class LikeService {
  public async setIdLikedItem(
    item: any,
    likedListIds: string[],
    category: string,
  ) {
    if (item) {
      if (likedListIds.includes(item.id)) {
        const filteredLikedList = likedListIds.filter(id => id !== item.id);
        await storageService.setData(category, filteredLikedList);
      } else {
        await storageService.setData(category, [...likedListIds, item.id]);
      }
    }
  }

  public checkLikeInListIds(item: any, likedListIds: string[]) {
    return likedListIds.length > 0
      ? likedListIds.includes(item.id)
        ? LIKE_RED
        : LIKE_GRAY
      : LIKE_GRAY;
  }

  public checkIsLikePress(item: any, likedListIds: string[]) {
    return likedListIds.length > 0 ? likedListIds.includes(item.id) : false;
  }
}

const likeService = new LikeService();
export default likeService;
