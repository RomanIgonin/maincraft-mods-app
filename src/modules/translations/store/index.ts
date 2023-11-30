import { create } from 'zustand';
import { getSystemLanguage } from '@src/modules/translations/domain/helpers/getSystemLanguage';
import storageService from '@src/modules/core/services/StorageService';
import translationsService from '@src/modules/translations/domain/services/TranslationsService';
import i18next from 'i18next';
import { resources } from '@src/modules/translations/domain/resources';
import { LanguageCode } from '@src/modules/translations/domain/interfaces/Language';

export type State = {
  currentLanguage: LanguageCode;
  loadTranslations: () => void;
  changeLanguage: (lang: LanguageCode) => void;
};

const LANG_KEY = 'LANGUAGE';

const useTranslationsStore = create<State>(set => ({
  currentLanguage: 'en',

  loadTranslations: async () => {
    try {
      const systemLng = getSystemLanguage();
      const savedLng = await storageService.getData(LANG_KEY);
      const currentLng = savedLng ? savedLng : systemLng;

      translationsService.init(currentLng, resources);
      set({ currentLanguage: currentLng });
    } catch (e) {
      console.warn(e);
    }
  },

  changeLanguage: async (lang: LanguageCode) => {
    try {
      await storageService.setData(LANG_KEY, lang);
      await i18next.changeLanguage(lang);
      set({ currentLanguage: lang });
    } catch (e) {
      console.warn(e);
    }
  },
}));

export default useTranslationsStore;
