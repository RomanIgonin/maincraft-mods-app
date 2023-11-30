import { create } from 'zustand';
import storageService from '@src/modules/core/services/StorageService';

type State = {
  enterInAppCounter: number;
  isCounterLoading: boolean;
  loadEnterInAppCounter: () => void;
};

const useWelcomeModalStore = create<State>((set, get) => ({
  enterInAppCounter: 5,
  isCounterLoading: false,

  loadEnterInAppCounter: async () => {
    try {
      set({ isCounterLoading: true });
      const count = await storageService.getData('ENTER_COUNTER');
      const countEnter = count ? Number(count) + 1 : 1;

      await storageService.setData('ENTER_COUNTER', String(countEnter));
      set({ enterInAppCounter: countEnter, isCounterLoading: false });
    } catch (err) {
      console.warn('err loadEnterInAppCounter', err);
      set({ isCounterLoading: false });
    }
  },
}));

export default useWelcomeModalStore;
