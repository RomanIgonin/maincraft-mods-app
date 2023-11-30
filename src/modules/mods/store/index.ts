import { create } from 'zustand';
import { getExistMods, getMods } from '@src/modules/mods/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';
import { LanguageCode } from '@src/modules/translations/domain/interfaces/Language';
import { getRandomElements } from '@src/modules/daily-selection/domain/helpers/getRandomElements';

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
    currentLanguage: LanguageCode,
  ) => void;
  loadExistMods: () => void;
  removeExistMods: () => void;
  updateMod: (mod: CategoryItem) => void;
  dailySelectionMods: CategoryItem[];
  isDailySelectionLoading: boolean;
  getDailySelection: () => void;
};

const useModsStore = create<State>((set, get) => ({
  mods: [],
  existMods: [],
  isModsLoading: false,
  isModsRefreshing: false,
  isModsSorting: false,
  dailySelectionMods: [],
  isDailySelectionLoading: false,

  loadMods: async () => {
    const state = get();
    try {
      set({ isModsLoading: true });
      const fMods = await getMods();
      set({ mods: fMods, isModsLoading: false });
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
    currentLanguage: LanguageCode,
  ) => {
    set({ isModsSorting: true });
    const mods = get().mods;
    const fMods = sortService.sort(
      mods,
      selectedSortType,
      selectedSortByAscending,
      currentLanguage,
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

  updateMod: (mod: CategoryItem) => {
    const state = get();
    if (mod) {
      const fMods = state.mods.map(i => {
        if (i.id === mod.id) {
          return mod;
        }
        return i;
      });
      set({ mods: fMods });
    }
    if (state.dailySelectionMods.find(i => i.id === mod.id)) {
      const fDailyMods = state.dailySelectionMods.map(i => {
        if (i.id === mod.id) {
          return mod;
        }
        return i;
      });
      set({ dailySelectionMods: fDailyMods });
    }
  },

  getDailySelection: () => {
    const state = get();
    set({ isDailySelectionLoading: true });
    const selectionMods = getRandomElements(state.mods, 10);
    set({ dailySelectionMods: selectionMods, isDailySelectionLoading: false });
  },
}));

export default useModsStore;
