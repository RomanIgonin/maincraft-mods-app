import React, { useCallback, useEffect } from 'react';
import * as S from './styles';
import Modal from 'react-native-modal';
import { theme } from '@styles/theme';
import useNotificationsStore from '@src/modules/notifications/store';
import { AppState, Linking } from 'react-native';
import notificationsService from '@src/modules/notifications/domain/services/NotificationService';
import notificationService from '@src/modules/notifications/domain/services/NotificationService';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

interface Props {
  openNotification: boolean;
  setOpenNotification: (bool: boolean) => void;
}

export default function NotificationModal(props: Props) {
  const { openNotification, setOpenNotification } = props;
  const { isGranted, isEnabledInSettings, checkNotification } =
    useNotificationsStore();

  useEffect(() => {
    AppState.addEventListener('change', status => {
      checkNotification();
    });
  }, []);

  const { t } = useAppTranslation('notific');

  const toggleSwitch = useCallback(async () => {
    if (isGranted) {
      await notificationsService.removeSavedToken();
    } else {
      await notificationService.refreshToken();
    }
    checkNotification();
  }, [isGranted]);

  const onPressTurnItOn = async () => {
    setOpenNotification(false);
    await Linking.openSettings();
  };

  return (
    <Modal
      isVisible={openNotification}
      backdropOpacity={0.3}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      style={{ margin: 20 }}
      onRequestClose={() => setOpenNotification(false)}>
      <S.ModalContainer>
        <S.ModalHeader fSize={27} fStyle={'caption700'}>
          {t('notification')}
        </S.ModalHeader>

        <S.SwitchAndTextWrap>
          <S.TextWrap>
            <S.NewAddonsText fSize={18} fStyle={'caption400'} color={'dark'}>
              {t('new_addons')}
            </S.NewAddonsText>

            <S.PersonalizedText fSize={15} fStyle={'caption400'}>
              {t('notification_addons')}
            </S.PersonalizedText>
          </S.TextWrap>

          <S.SwitchNotificationWrap>
            <S.SwitchNotification
              trackColor={{ false: '#e7e7e7', true: theme.colors.green }}
              thumbColor={'#fff'}
              ios_backgroundColor="#eee"
              onValueChange={toggleSwitch}
              value={isGranted}
              disabled={!isEnabledInSettings}
            />
          </S.SwitchNotificationWrap>
        </S.SwitchAndTextWrap>

        {!isEnabledInSettings && (
          <>
            <S.PersonalizedText fSize={15} fStyle={'caption400'}>
              {t('disabled')}
            </S.PersonalizedText>

            <S.TapHereText
              fStyle={'caption700'}
              color={'green'}
              fSize={16}
              onPress={onPressTurnItOn}>
              {t('tap')}
            </S.TapHereText>
          </>
        )}

        <S.ButtonOkWrap>
          <S.ButtonWrap onPress={() => setOpenNotification(false)}>
            <S.ButtonOk color={'green'} fStyle={'caption700'}>
              OK
            </S.ButtonOk>
          </S.ButtonWrap>
        </S.ButtonOkWrap>
      </S.ModalContainer>
    </Modal>
  );
}
