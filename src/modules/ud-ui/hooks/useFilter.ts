import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

export const useFilter = () => {
  const filterBySimilar = (
    data: CategoryItem[],
    categoryItem: CategoryItem,
  ) => {
    const arrayTags = categoryItem.tags.toLowerCase().split(' ');

    let similarItems: CategoryItem[] = [];

    arrayTags.map(tag => {
      const arr = data.filter(dataItem => {
        const dataItemTagsArr = dataItem.tags.toLowerCase().split(' ');

        if (dataItemTagsArr.find(item => item === tag)) {
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

  const filterByTag = (data: CategoryItem[], category: string) => {
    return data.filter(item => item.tags.toLowerCase().includes(category));
  };

  return { filterBySimilar, filterByTag };
};
