import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export class TranslationsService {
  public init(lng: string, resources: any) {
    i18n.use(initReactI18next).init({
      compatibilityJSON: 'v3',
      fallbackLng: 'en',
      lng,
      resources,
    });
  }
}

const translationsService = new TranslationsService();
export default translationsService;
