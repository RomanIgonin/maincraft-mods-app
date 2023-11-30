import * as S from '@src/modules/welcome-modal/ui/components/styles';
import {
  BUTTON_PUT_A_RATING,
  CHARACTER_RATE_APP,
  STARS,
} from '@src/assets/constants/imagePaths';
import React from 'react';
import InAppReview from 'react-native-in-app-review';

interface Props {
  setModalVisible: (bool: boolean) => void;
}

export const RateModal = (props: Props) => {
  const { setModalVisible } = props;

  const onPressPutRating = () => {
    const isAvailable = InAppReview.isAvailable();
    if (isAvailable) {
      InAppReview.RequestInAppReview()
        .then(() => {})
        .catch(error => {
          console.warn('Error in RequestInAppReview', error);
        });
    }
    setModalVisible(false);
  };

  return (
    <>
      <S.ModalWrap>
        <S.ImageStars source={STARS} />

        <S.ModalHeader fSize={26} fStyle={'caption700'}>
          Please rate the app
        </S.ModalHeader>

        <S.ModalTextWrap>
          <S.ModalText fStyle={'caption400'}>
            If you liked the app, could you rate it in the AppStore?
          </S.ModalText>
        </S.ModalTextWrap>

        <S.ButtonWrap onPress={onPressPutRating}>
          <S.ButtonOk source={BUTTON_PUT_A_RATING} />
        </S.ButtonWrap>

        <S.ButtonWrap
          onPress={() => {
            setModalVisible(false);
          }}>
          <S.ButtonNotNow>Not now</S.ButtonNotNow>
        </S.ButtonWrap>
      </S.ModalWrap>

      <S.ImageBgRateApp source={CHARACTER_RATE_APP} />
    </>
  );
};
