import { create } from 'zustand';
import { getExistSeeds, getSeeds } from '@src/modules/seeds/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import sortService from '@src/modules/ud-sort/domain/services/SortService';

export interface ExistSeeds {
  id: string;
}

type State = {
  seeds: CategoryItem[];
  existSeeds: ExistSeeds[];
  isSeedsLoading: boolean;
  isSeedsRefreshing: boolean;
  isSeedsSorting: boolean;
  loadSeeds: () => void;
  refreshSeeds: () => void;
  sortSeeds: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
  ) => void;
  loadExistSeeds: () => void;
  removeExistSeeds: () => void;
};

const useSeedsStore = create<State>((set, get) => ({
  seeds: [],
  existSeeds: [],
  isSeedsLoading: false,
  isSeedsRefreshing: false,
  isSeedsSorting: false,

  loadSeeds: async () => {
    const state = get();
    try {
      set({ isSeedsLoading: true });
      const fSeeds = await getSeeds();
      set({ seeds: fSeeds, isSeedsLoading: false });

      state.sortSeeds('By default', 'Ascending');
      state.loadExistSeeds();
    } catch (err) {
      console.warn('err loadSeeds', err);
      set({ isSeedsLoading: false });
    }
  },

  refreshSeeds: async () => {
    set({ isSeedsRefreshing: true });
    const fSeeds = await getSeeds();
    set({ seeds: fSeeds, isSeedsRefreshing: false });
  },

  sortSeeds: (
    selectedSortType: SortByType,
    selectedSortByAscending: SortByAscending,
  ) => {
    set({ isSeedsSorting: true });
    const seeds = get().seeds;
    const fSeeds = sortService.sort(
      seeds,
      selectedSortType,
      selectedSortByAscending,
    );
    set({ seeds: fSeeds, isSeedsSorting: false });
  },

  loadExistSeeds: async () => {
    const state = get();
    const existSeedsArr = await getExistSeeds(state.seeds);
    set({ existSeeds: existSeedsArr });
  },

  removeExistSeeds: () => {
    set({ existSeeds: [] });
  },
}));

export default useSeedsStore;
