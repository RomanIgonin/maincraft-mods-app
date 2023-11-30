import { create } from 'zustand';
import settingsService from '@src/modules/settings/domain/services/SettingsService';

type State = {
  cacheSize: string;
  isCacheLoading: boolean;
  loadCacheSize: () => void;
  removeCache: () => void;
};

const useSettingsStore = create<State>(set => ({
  cacheSize: ' (0 b)',
  isCacheLoading: false,

  loadCacheSize: async () => {
    try {
      set({ isCacheLoading: true });
      const size = await settingsService.getCacheSize();
      set({ cacheSize: size, isCacheLoading: false });
    } catch (err) {
      console.warn('error loadCacheSize', err);
      set({ isCacheLoading: false });
    }
  },

  removeCache: async () => {
    try {
      set({ isCacheLoading: true });
      const size = await settingsService.clearCache();
      set({ cacheSize: ' (0 b)', isCacheLoading: false });
    } catch (err) {
      console.warn('error removeCache', err);
      set({ isCacheLoading: false });
    }
  },
}));

export default useSettingsStore;
