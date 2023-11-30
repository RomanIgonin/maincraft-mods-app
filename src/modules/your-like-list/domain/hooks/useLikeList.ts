import storageService from '@src/modules/core/services/StorageService';
import { useEffect, useMemo, useState } from 'react';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

type Props = {
  data: CategoryItem[];
  category: string;
};

export default function useLikeList({ data, category }: Props) {
  const [likedListIds, setLikedListIds] = useState<string[]>([]);

  useEffect(() => {
    storageService.getData(category).then(res => {
      setLikedListIds(res as string[]);
    });
  }, [category]);

  const likedData = useMemo(() => {
    return data.filter(item =>
      likedListIds ? likedListIds.includes(item.id) : false,
    );
  }, [data, likedListIds]);

  return { likedData };
}
