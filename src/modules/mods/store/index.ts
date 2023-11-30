import { create } from 'zustand';
import { getExistMods, getMods } from '@src/modules/mods/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';

export interface ExistMods {
  id: string;
}

type State = {
  mods: CategoryItem[];
  existMods: ExistMods[];
  isModsLoading: boolean;
  isModsRefreshing: boolean;
  isModsSorting: boolean;
  loadMods: () => void;
  refreshMods: () => void;
  sortMods: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
  ) => void;
  loadExistMods: () => void;
  removeExistMods: () => void;
};

const useModsStore = create<State>((set, get) => ({
  mods: [],
  existMods: [],
  isModsLoading: false,
  isModsRefreshing: false,
  isModsSorting: false,

  loadMods: async () => {
    const state = get();
    try {
      set({ isModsLoading: true });
      const fMods = await getMods();
      set({ mods: fMods, isModsLoading: false });

      state.sortMods('By default', 'Ascending');
      state.loadExistMods();
    } catch (err) {
      console.warn('err loadMods', err);
      set({ isModsLoading: false });
    }
  },

  refreshMods: async () => {
    set({ isModsRefreshing: true });
    const fMods = await getMods();
    set({ mods: fMods, isModsRefreshing: false });
  },

  sortMods: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
  ) => {
    set({ isModsSorting: true });
    const mods = get().mods;
    const fMods = sortService.sort(
      mods,
      selectedSortType,
      selectedSortByAscending,
    );
    set({ mods: fMods, isModsSorting: false });
  },

  loadExistMods: async () => {
    const state = get();
    const existModsArr = await getExistMods(state.mods);
    set({ existMods: existModsArr });
  },

  removeExistMods: () => {
    set({ existMods: [] });
  },
}));

export default useModsStore;
