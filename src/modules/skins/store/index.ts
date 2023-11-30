import { create } from 'zustand';
import { getExistSkins, getSkins } from '@src/modules/skins/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';

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
  ) => void;
  loadExistSkins: () => void;
  removeExistSkins: () => void;
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

      state.sortSkins('By default', 'Ascending');
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
  ) => {
    set({ isSkinsSorting: true });
    const seeds = get().skins;
    const fSkins = sortService.sort(
      seeds,
      selectedSortType,
      selectedSortByAscending,
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
}));

export default useSkinsStore;
