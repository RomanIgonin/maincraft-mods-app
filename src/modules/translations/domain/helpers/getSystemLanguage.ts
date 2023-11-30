import { NativeModules, Platform } from 'react-native';

export function getSystemLanguage() {
  const locale =
    Platform.OS === 'ios'
      ? NativeModules.SettingsManager.settings.AppleLocale ||
        NativeModules.SettingsManager.settings.AppleLanguages[0]
      : NativeModules.I18nManager.localeIdentifier || 'en';

  return locale.split('_')[0].split('-')[0];
}
