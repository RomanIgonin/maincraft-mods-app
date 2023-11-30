import * as S from '@src/modules/welcome-modal/ui/components/styles';
import {
  BUTTON_ALLOW,
  BUTTON_CANCEL,
  BUTTON_CONTINUE,
  COW,
} from '@src/assets/constants/imagePaths';
import { Linking } from 'react-native';
import React from 'react';
import useWelcomeModalStore from '@src/modules/welcome-modal/store';
import { requestTrackingPermission } from 'react-native-tracking-transparency';

interface Props {
  setModalVisible: (bool: boolean) => void;
}

export const AllowTrackingModal = (props: Props) => {
  const { enterInAppCounter } = useWelcomeModalStore();
  const { setModalVisible } = props;

  const openAllowTrackingAlert = async () => {
    if (enterInAppCounter === 1) {
      await requestTrackingPermission();
    } else {
      await Linking.openSettings();
    }
    setModalVisible(false);
  };

  return (
    <>
      <S.ModalWrap>
        <S.ModalHeader fSize={26} fStyle={'caption700'}>
          Do you want the AddMods app remain FREE?
        </S.ModalHeader>

        <S.ModalTextWrap>
          <S.ModalText fStyle={'caption400'}>
            Our app earns revenue from in app ads. Tap 'Allow' and on the next
            screen to give permission on "Allow Tracking" for more interesting
            ads for you. Rejection will not remove the ads - you may see
            uninteresting ads.
          </S.ModalText>
        </S.ModalTextWrap>

        {enterInAppCounter === 1 ? (
          <S.ButtonWrap onPress={openAllowTrackingAlert}>
            <S.ButtonContinue source={BUTTON_CONTINUE} />
          </S.ButtonWrap>
        ) : (
          <>
            <S.ButtonWrap onPress={openAllowTrackingAlert}>
              <S.ButtonOk source={BUTTON_ALLOW} />
            </S.ButtonWrap>

            <S.ButtonWrap
              onPress={() => {
                setModalVisible(false);
              }}>
              <S.ButtonCancel source={BUTTON_CANCEL} />
            </S.ButtonWrap>
          </>
        )}
      </S.ModalWrap>

      <S.ImageBgCow source={COW} />
    </>
  );
};
