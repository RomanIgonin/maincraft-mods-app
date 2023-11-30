import { create } from 'zustand';
import { getExistMaps, getMaps } from '@src/modules/maps/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';

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
  ) => void;
  loadExistMaps: () => void;
  removeExistMaps: () => void;
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

      state.sortMaps('By default', 'Ascending');
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
  ) => {
    try {
      set({ isMapsSorting: true });
      const maps = get().maps;
      const fMaps = sortService.sort(
        maps,
        selectedSortType,
        selectedSortByAscending,
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
}));

export default useMapsStore;
