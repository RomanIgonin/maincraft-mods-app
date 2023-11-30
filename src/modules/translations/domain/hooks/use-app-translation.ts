import { useTranslation } from 'react-i18next';

export const useAppTranslation = (
  ...args: Parameters<typeof useTranslation>
) => {
  const { t, ...other } = useTranslation(...args);
  return { t: (keys: string) => t(keys), ...other };
};
