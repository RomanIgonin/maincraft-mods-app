import { CategoryType } from '@src/modules/core/interfaces/categoryType';

export interface Hint {
  type: CategoryType;
  hints: string[];
}
