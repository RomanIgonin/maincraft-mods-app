import { create } from 'zustand';
import { getExistSkins, getSkins } from '@src/modules/skins/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';
import { LanguageCode } from '@src/modules/translations/domain/interfaces/Language';

export interface ExistSkins {
  id: string;
}

type State = {
  skins: CategoryItem[];
  existSkins: ExistSkins[];
  isSkinsLoading: boolean;
  isSkinsRefreshing: boolean;
  isSkinsSorting: boolean;
  loadSkins: () => void;
  refreshSkins: () => void;
  sortSkins: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
    currentLanguage: LanguageCode,
  ) => void;
  loadExistSkins: () => void;
  removeExistSkins: () => void;
  updateSkin: (skin: CategoryItem) => void;
};

const useSkinsStore = create<State>((set, get) => ({
  skins: [],
  existSkins: [],
  isSkinsLoading: false,
  isSkinsRefreshing: false,
  isSkinsSorting: false,

  loadSkins: async () => {
    const state = get();
    try {
      set({ isSkinsLoading: true });
      const fSkins = await getSkins();
      set({ skins: fSkins, isSkinsLoading: false });
      state.loadExistSkins();
    } catch (err) {
      console.warn('err loadSkins', err);
      set({ isSkinsLoading: false });
    }
  },

  refreshSkins: async () => {
    set({ isSkinsRefreshing: true });
    const fSkins = await getSkins();
    set({ skins: fSkins, isSkinsRefreshing: false });
  },

  sortSkins: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
    currentLanguage: LanguageCode,
  ) => {
    set({ isSkinsSorting: true });
    const seeds = get().skins;
    const fSkins = sortService.sort(
      seeds,
      selectedSortType,
      selectedSortByAscending,
      currentLanguage,
    );
    set({ skins: fSkins, isSkinsSorting: false });
  },

  loadExistSkins: async () => {
    const state = get();
    const existSkinsArr = await getExistSkins(state.skins);
    set({ existSkins: existSkinsArr });
  },

  removeExistSkins: () => {
    set({ existSkins: [] });
  },

  updateSkin: (skin: CategoryItem) => {
    const state = get();
    if (skin) {
      const fSkins = state.skins.map(i => {
        if (i.id === skin.id) {
          return skin;
        }
        return i;
      });
      set({ skins: fSkins });
    }
  },
}));

export default useSkinsStore;
