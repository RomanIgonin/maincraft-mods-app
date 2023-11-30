import { create } from 'zustand';
import { getSeeds } from '@src/modules/seeds/store/actions';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

type State = {
  seeds: CategoryItem[];
  isSeedsLoading: boolean;
  isSeedsRefreshing: boolean;
  isSeedsSorting: boolean;
  loadSeeds: () => void;
  refreshSeeds: () => void;
  updateSeed: (seed: CategoryItem) => void;
};

const useSeedsStore = create<State>((set, get) => ({
  seeds: [],
  isSeedsLoading: false,
  isSeedsRefreshing: false,
  isSeedsSorting: false,

  loadSeeds: async () => {
    try {
      set({ isSeedsLoading: true });
      const fSeeds = await getSeeds();
      set({ seeds: fSeeds, isSeedsLoading: false });
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

  updateSeed: (seed: CategoryItem) => {
    const state = get();
    if (seed) {
      const fSeeds = state.seeds.map(i => {
        if (i.id === seed.id) {
          return seed;
        }
        return i;
      });
      set({ seeds: fSeeds });
    }
  },
}));

export default useSeedsStore;
