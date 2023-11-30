import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as S from './styles';
import { FlatList, Linking, ListRenderItem } from 'react-native';
import {
  ADVERTISING,
  DATA_CLEANING,
  INFO,
  MAIL,
  RECTANGLE,
  RESTORE,
  SHARE_GRAY,
  STAR,
  WORLD,
} from '@src/assets/constants/imagePaths';
import useSettingsStore from '@src/modules/settings/store';
import { useNavigation } from '@react-navigation/native';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import { useShare } from '@src/modules/ud-ui/hooks/useShare';
import screenNames from '@src/modules/navigation/screen-names';
import NotificationModal from '@src/modules/settings/ui/components/notification-modal';
import InAppReview from 'react-native-in-app-review';
import storageService from '@src/modules/core/services/StorageService';
import useTestModeStore from '@src/modules/test-mode/store';
import LanguageModal from '@src/modules/translations/ui/components/language-modal';
import { SettingsMenuItem } from '@src/modules/settings/ui/components/settings-menu/SettingsMenuItem';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import analyticService from '@src/modules/analytics/services/AnayticService';

export default function SettingsMenu() {
  const { t } = useAppTranslation('settings');
  const { cacheSize, loadCacheSize, removeCache } = useSettingsStore();
  const { removeExistMods } = useModsStore();
  const { removeExistMaps } = useMapsStore();
  const { removeExistSkins } = useSkinsStore();
  const { share } = useShare();
  const { setTestMode } = useTestModeStore();

  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const appName = 'MainkraftModsApp';
  const appUrl = 'https://maincraftmodsapp.page.link/Go1D';

  useEffect(() => {
    loadCacheSize();
  }, [loadCacheSize]);

  const onPressContactUs = async () => {
    const mail = 'mailto:support@example.com';
    await Linking.openURL(mail);
  };

  const onPressItem = useCallback(
    async ({ item }: any) => {
      if (item.label === t('contact')) {
        analyticService.reportEvent('click_contact_us');
        await onPressContactUs();
      } else if (item.label === t('clear')) {
        analyticService.reportEvent('click_clear_cache');
        removeCache();
        removeExistMods();
        removeExistMaps();
        removeExistSkins();
      } else if (item.label === t('language')) {
        setOpenLanguage(true);
      } else if (item.label === t('share')) {
        await share(appName, appUrl);
      } else if (item.label === t('ads')) {
        // TODO: добавить премиум модалку
      } else if (item.label === t('notification')) {
        setOpenNotification(true);
      } else if (item.label === t('rate')) {
        const isAvailable = InAppReview.isAvailable();
        if (isAvailable) {
          InAppReview.RequestInAppReview()
            .then(() => {})
            .catch(error => {
              console.warn(error);
            });
        }
      } else if (item.label === t('restore')) {
      } else {
        navigation.navigate(screenNames.aboutApp);
      }
    },
    [
      navigation,
      removeCache,
      removeExistMaps,
      removeExistMods,
      removeExistSkins,
      share,
      t,
    ],
  );

  const onLongPressItem = useCallback(
    async ({ item }: any) => {
      if (item.label === t('about')) {
        const isTestMode = await storageService.getData('TEST_MODE');
        if (typeof isTestMode === 'boolean') {
          await storageService.setData('TEST_MODE', !isTestMode);
          setTestMode(!isTestMode);
        } else {
          await storageService.setData('TEST_MODE', true);
        }
      }
    },
    [setTestMode, t],
  );

  const keyExtractor = (item: SettingsMenuItem) => item.id;
  const renderItem: ListRenderItem<SettingsMenuItem> = useCallback(
    ({ item }) => {
      return (
        <S.ItemWrap isLastItem={item.label === t('about')}>
          <S.TouchableItemWrap
            onPress={() => onPressItem({ item })}
            delayLongPress={5000}
            onLongPress={() => onLongPressItem({ item })}>
            <S.Icon source={item.icon} />
            <S.Label fStyle={'caption400'}>
              {item.label === t('clear') ? item.label + cacheSize : item.label}
            </S.Label>
          </S.TouchableItemWrap>
        </S.ItemWrap>
      );
    },
    [cacheSize, onLongPressItem, onPressItem],
  );

  const SettingsMenuItems: SettingsMenuItem[] = useMemo(
    () => [
      { id: '1', icon: MAIL, label: t('contact') },
      { id: '2', icon: DATA_CLEANING, label: t('clear') },
      { id: '3', icon: WORLD, label: t('language') },
      { id: '4', icon: SHARE_GRAY, label: t('share') },
      // { id: '5', icon: ADVERTISING, label: t('ads') },
      { id: '6', icon: RECTANGLE, label: t('notification') },
      { id: '7', icon: STAR, label: t('rate') },
      // { id: '8', icon: RESTORE, label: t('restore') },
      { id: '9', icon: INFO, label: t('about') },
    ],
    [t],
  );

  return (
    <S.Container>
      <FlatList
        data={SettingsMenuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
      />

      <LanguageModal
        openLanguage={openLanguage}
        setOpenLanguage={setOpenLanguage}
      />

      <NotificationModal
        openNotification={openNotification}
        setOpenNotification={setOpenNotification}
      />
    </S.Container>
  );
}
