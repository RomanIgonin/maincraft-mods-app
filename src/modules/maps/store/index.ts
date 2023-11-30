import { create } from 'zustand';
import { getExistMaps, getMaps } from '@src/modules/maps/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';
import { LanguageCode } from '@src/modules/translations/domain/interfaces/Language';

export interface ExistMaps {
  id: string;
}

type State = {
  maps: CategoryItem[];
  existMaps: ExistMaps[];
  isMapsLoading: boolean;
  isMapsRefreshing: boolean;
  isMapsSorting: boolean;
  loadMaps: () => void;
  refreshMaps: () => void;
  sortMaps: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
    currentLanguage: LanguageCode,
  ) => void;
  loadExistMaps: () => void;
  removeExistMaps: () => void;
  updateMap: (map: CategoryItem) => void;
};

const useMapsStore = create<State>((set, get) => ({
  maps: [],
  existMaps: [],
  isMapsLoading: false,
  isMapsRefreshing: false,
  isMapsSorting: false,

  loadMaps: async () => {
    const state = get();
    try {
      set({ isMapsLoading: true });
      const fMaps = await getMaps();
      set({ maps: fMaps, isMapsLoading: false });
      state.loadExistMaps();
    } catch (err) {
      console.warn('err loadMaps', err);
      set({ isMapsLoading: false });
    }
  },

  refreshMaps: async () => {
    set({ isMapsRefreshing: true });
    const fMaps = await getMaps();
    set({ maps: fMaps, isMapsRefreshing: false });
  },

  sortMaps: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
    currentLanguage: LanguageCode,
  ) => {
    try {
      set({ isMapsSorting: true });
      const maps = get().maps;
      const fMaps = sortService.sort(
        maps,
        selectedSortType,
        selectedSortByAscending,
        currentLanguage,
      );
      set({ maps: fMaps, isMapsSorting: false });
    } catch (error) {}
  },

  loadExistMaps: async () => {
    const state = get();
    const existMapsArr = await getExistMaps(state.maps);
    set({ existMaps: existMapsArr });
  },

  removeExistMaps: () => {
    set({ existMaps: [] });
  },

  updateMap: (map: CategoryItem) => {
    const state = get();
    if (map) {
      const fMaps = state.maps.map(i => {
        if (i.id === map.id) {
          return map;
        }
        return i;
      });
      set({ maps: fMaps });
    }
  },
}));

export default useMapsStore;
