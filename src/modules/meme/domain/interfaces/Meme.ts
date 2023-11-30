import { CategoryType } from '@src/modules/core/interfaces/categoryType';

export interface Meme {
  _id: string;
  desc: {
    en: string;
    ru: string;
  };
  picture: {
    url: string;
  };
  itemId: string;
  categoryType: CategoryType;
  haveAdv: boolean;
  likes: number;
}
