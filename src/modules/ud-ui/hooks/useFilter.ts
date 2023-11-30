import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

export const useFilter = () => {
  const filterBySimilar = (
    data: CategoryItem[],
    categoryItem: CategoryItem,
  ) => {
    let similarItems: CategoryItem[] = [];
    categoryItem.tags.split(' ').map((tag: string) => {
      const arr = data.filter(dataItem => {
        if (dataItem.tags.split(' ').find((item: string) => item === tag)) {
          if (categoryItem.id !== dataItem.id) {
            if (!similarItems.find(item => item.id === dataItem.id)) {
              return true;
            }
          }
        }
      });
      similarItems.push(...arr);
    });
    return similarItems;
  };

  const filterByTag = (data: CategoryItem[], tag: string) => {
    if (tag === '') {
      return data;
    }
    return data.filter(item =>
      item.tags.split(' ').find(i => i.toLowerCase().includes(tag)),
    );
  };

  return { filterBySimilar, filterByTag };
};
