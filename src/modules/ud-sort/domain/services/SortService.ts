import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { LanguageCode } from '@src/modules/translations/domain/interfaces/Language';

export class SortService {
  public sort(
    data: CategoryItem[],
    sortByType: SortByType,
    sortByAscending: SortByAscending,
    currentLanguage: LanguageCode,
  ): CategoryItem[] {
    return data.sort(function (a, b) {
      const typeResolve = (item: CategoryItem) => {
        if (sortByType === 'By downloads') {
          return item.downloads;
        } else if (sortByType === 'By like') {
          return item.likes;
        } else {
          if (currentLanguage === 'en') {
            return item.name.en;
          } else {
            return item.name.ru;
          }
        }
      };
      const prev = typeResolve(a);
      const curr = typeResolve(b);
      if (prev > curr) {
        return sortByAscending === 'Ascending' ? 1 : -1;
      }
      if (prev < curr) {
        return sortByAscending === 'Ascending' ? -1 : 1;
      }
      return 0;
    });
  }
}

const sortService = new SortService();
export default sortService;
