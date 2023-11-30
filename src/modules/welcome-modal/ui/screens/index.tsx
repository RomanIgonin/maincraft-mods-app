import * as S from './styles';
import Modal from 'react-native-modal';
import React, { useCallback, useEffect, useState } from 'react';
import useWelcomeModalStore from '@src/modules/welcome-modal/store';
import { AllowTrackingModal } from '@src/modules/welcome-modal/ui/components/allow-tracking-modal';
import { NotificationModal } from '@src/modules/welcome-modal/ui/components/notification-modal';
import { RateModal } from '@src/modules/welcome-modal/ui/components/rate-modal';

export default function WelcomeModal() {
  const { enterInAppCounter } = useWelcomeModalStore();

  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    setModalVisible(enterInAppCounter <= 4);
  }, [enterInAppCounter]);

  const onPressBackButton = () => {
    setModalVisible(false);
  };

  const allowTrackingModal = useCallback(() => {
    return <AllowTrackingModal setModalVisible={setModalVisible} />;
  }, [enterInAppCounter]);

  const resolveContent = useCallback(() => {
    if (enterInAppCounter === 1 || enterInAppCounter === 4) {
      return allowTrackingModal();
    } else if (enterInAppCounter === 2) {
      return <NotificationModal setModalVisible={setModalVisible} />;
    } else if (enterInAppCounter === 3) {
      return <RateModal setModalVisible={setModalVisible} />;
    }
  }, [enterInAppCounter]);

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.3}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onRequestClose={onPressBackButton}>
      <S.Container>
        <S.ModalContainer>{resolveContent()}</S.ModalContainer>
      </S.Container>
    </Modal>
  );
}
