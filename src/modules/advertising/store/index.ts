import { create } from 'zustand';

type State = {
  showAdCategoryBtn: boolean;
  showAdDetailsScreen: boolean;
  setShowAdCategoryBtn: (bool: boolean) => void;
  setShowAdDetailsScreen: () => void;
  detailsPressCounter: number;
};

const useAdvertisingStore = create<State>((set, get) => ({
  showAdCategoryBtn: true,
  showAdDetailsScreen: false,
  detailsPressCounter: 1,

  setShowAdCategoryBtn: (bool: boolean) => {
    set({ showAdCategoryBtn: bool });
  },
  setShowAdDetailsScreen: () => {
    const state = get();
    const counter = state.detailsPressCounter + 1;
    set({ showAdDetailsScreen: false, detailsPressCounter: counter });

    if (counter > 2) {
      set({ showAdDetailsScreen: true, detailsPressCounter: 0 });
    }
  },
}));

export default useAdvertisingStore;
