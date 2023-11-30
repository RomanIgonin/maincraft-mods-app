import { create } from 'zustand';
import Config from 'react-native-config';
import axios from 'axios';
import { Hint } from '@src/modules/search/domain/interfaces/Hint';

const API_URL_HINT = Config.API_URL + 'hint';

type State = {
  hints: Hint[];
  isHintsLoading: boolean;
  loadHints: () => void;
};

const useHintsStore = create<State>(set => ({
  hints: [],
  isHintsLoading: false,

  loadHints: async () => {
    try {
      set({ isHintsLoading: true });
      const fHints = await axios.get(API_URL_HINT);
      if (fHints.data) {
        set({ hints: fHints.data, isHintsLoading: false });
      } else {
        set({ isHintsLoading: false });
      }
    } catch (error) {
      console.log('error in loadHints', error);
      set({ isHintsLoading: false });
    }
  },
}));

export default useHintsStore;
