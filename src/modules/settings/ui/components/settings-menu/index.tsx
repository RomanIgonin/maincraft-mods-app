import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { FlatList, Linking } from 'react-native';
import { SettingsMenuItems } from '@src/modules/settings/ui/components/settings-menu/menu-items';
import useSettingsStore from '@src/modules/settings/store';
import { useNavigation } from '@react-navigation/native';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import LanguageModal from '@src/modules/settings/ui/components/language-modal';
import { useShare } from '@src/modules/ud-ui/hooks/useShare';
import screenNames from '@src/modules/navigation/screen-names';
import NotificationModal from '@src/modules/settings/ui/components/notification-modal';
import InAppReview from 'react-native-in-app-review';

export default function SettingsMenu() {
  const { cacheSize, loadCacheSize, removeCache } = useSettingsStore();
  const { removeExistMods } = useModsStore();
  const { removeExistMaps } = useMapsStore();
  const { removeExistSkins } = useSkinsStore();
  const { removeExistSeeds } = useSeedsStore();

  const [openLanguage, setOpenLanguage] = useState<boolean>(false);
  const [openNotification, setOpenNotification] = useState<boolean>(false);
  const navigation = useNavigation<any>();

  const appName = 'MainkraftApp';
  const appUrl = 'https://mainkraftapp.com';

  useEffect(() => {
    loadCacheSize();
  }, []);

  const onPressContactUs = async () => {
    const mail = 'mailto:support@example.com';
    await Linking.openURL(mail);
  };

  const onPressItem = ({ item }) => {
    if (item.label === 'Contact us') {
      onPressContactUs();
    } else if (item.label === 'Clear cache') {
      removeCache();
      removeExistMods();
      removeExistMaps();
      removeExistSkins();
      removeExistSeeds();
    } else if (item.label === 'Language') {
      setOpenLanguage(true);
    } else if (item.label === 'Share') {
      useShare(appName, appUrl);
    } else if (item.label === 'Remove ads') {
      navigation.navigate(screenNames.premium);
    } else if (item.label === 'Notification') {
      setOpenNotification(true);
    } else if (item.label === 'Rate the app') {
      const isAvailable = InAppReview.isAvailable();
      if (isAvailable) {
        InAppReview.RequestInAppReview()
          .then(() => {})
          .catch(error => {
            console.warn(error);
          });
      }
    } else if (item.label === 'Restore purchases') {
    } else {
      navigation.navigate(screenNames.aboutApp);
    }
  };

  const keyExtractor = item => item.id;
  const renderItem = useCallback(
    ({ item }) => {
      return (
        <S.ItemWrap isLastItem={item.label === 'About app'}>
          <S.TouchableItemWrap onPress={() => onPressItem({ item })}>
            <S.Icon source={item.icon} />
            <S.Label fStyle={'caption400'}>
              {item.label === 'Clear cache'
                ? item.label + cacheSize
                : item.label}
            </S.Label>
          </S.TouchableItemWrap>
        </S.ItemWrap>
      );
    },
    [cacheSize],
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
