export type LanguageCode = 'en' | 'ru';

export interface Language {
  id: number;
  code: LanguageCode;
  title: string;
}
