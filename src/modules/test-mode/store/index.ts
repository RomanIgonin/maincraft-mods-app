import { create } from 'zustand';

type State = {
  isTestMode: boolean;
  setTestMode: (isTestMode: boolean) => void;
};

const useTestModeStore = create<State>(set => ({
  isTestMode: false,

  setTestMode: async (isTest: boolean) => {
    set({ isTestMode: isTest });
  },
}));

export default useTestModeStore;
