import storageService from '@src/modules/core/services/StorageService';
import { useState } from 'react';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

export class LikeListService {
  public FilterLikedData(data: CategoryItem[], category: string) {
    const [likedListIds, setLikedListIds] = useState<CategoryItem[]>([]);
    storageService.getData(category).then(res => {
      setLikedListIds(res);
    });
    return data.filter(item =>
      likedListIds ? likedListIds.includes(item.id) : false,
    );
  }
}

const likeListService = new LikeListService();
export default likeListService;
