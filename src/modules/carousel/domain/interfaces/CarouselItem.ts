import { CategoryType } from '@src/modules/core/interfaces/categoryType';

export interface CarouselItem {
  asset_id: string;
  url: string;
  type: CategoryType;
}
