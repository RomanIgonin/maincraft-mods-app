import * as S from '@src/modules/welcome-modal/ui/components/styles';
import {
  BUTTON_ALLOW,
  CHARACTER_NOTIFICATION,
} from '@src/assets/constants/imagePaths';
import React from 'react';
import notificationsService from '@src/modules/notifications/domain/services/NotificationService';
import useNotificationsStore from '@src/modules/notifications/store';
import notificationService from '@src/modules/notifications/domain/services/NotificationService';

interface Props {
  setModalVisible: (bool: boolean) => void;
}

export const NotificationModal = (props: Props) => {
  const { setModalVisible } = props;
  const { checkNotification } = useNotificationsStore();

  const onPressAllow = () => {
    notificationsService.requestNotificationsPermissions().then(() => {
      notificationService.refreshToken();
      // checkNotification();
    });
    setModalVisible(false);
  };

  return (
    <>
      <S.ModalWrap>
        <S.ModalHeader fSize={26} fStyle={'caption700'}>
          Notifications
        </S.ModalHeader>

        <S.ModalTextWrap>
          <S.ModalText fStyle={'caption400'}>
            Would you like to receive notifications for new addons? If so, click
            "Allow" and enable notifications.
          </S.ModalText>
        </S.ModalTextWrap>

        <S.ButtonWrap onPress={onPressAllow}>
          <S.ButtonOk source={BUTTON_ALLOW} />
        </S.ButtonWrap>

        <S.ButtonWrap
          onPress={() => {
            setModalVisible(false);
          }}>
          <S.ButtonNotNow>Not now</S.ButtonNotNow>
        </S.ButtonWrap>
      </S.ModalWrap>

      <S.ImageBgNotification source={CHARACTER_NOTIFICATION} />
    </>
  );
};
