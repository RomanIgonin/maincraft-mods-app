import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

export class SortService {
  public sort(
    data: CategoryItem[],
    sortByType: SortByType,
    sortByAscending: SortByAscending,
  ): CategoryItem[] {
    if (sortByType === 'By downloads') {
      // TODO: После добавления на сервер кол-ва скачиваний сделать эту сортировку
      return data;
    } else if (sortByType === 'By like') {
      // TODO: После добавления на сервер кол-ва лайков сделать эту сортировку
      return data;
    } else {
      return data.sort(function (a, b) {
        if (a.engName > b.engName) {
          return sortByAscending === 'Ascending' ? 1 : -1;
        }
        if (a.engName < b.engName) {
          return sortByAscending === 'Ascending' ? -1 : 1;
        }
        return 0;
      });
    }
  }
}

const sortService = new SortService();
export default sortService;
