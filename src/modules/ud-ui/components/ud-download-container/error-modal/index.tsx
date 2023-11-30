import React from 'react';
import * as S from './styles';
import Modal from 'react-native-modal';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

interface Props {
  isErrorModalVisible: boolean;
  setIsErrorModalVisible: (bool: boolean) => void;
}

export default function DownloadErrorModal(props: Props) {
  const { isErrorModalVisible, setIsErrorModalVisible } = props;
  const { t } = useAppTranslation('shared');
  return (
    <Modal
      isVisible={isErrorModalVisible}
      backdropOpacity={0.3}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      // @ts-ignore
      onRequestClose={() => setIsErrorModalVisible(false)}>
      <S.ErrorModalWrap>
        <S.Title fSize={26} fStyle={'caption700'}>
          {t('error')}
        </S.Title>
        <S.ErrorMessage fStyle={'caption400'} fSize={20}>
          {t('not_installed')}
        </S.ErrorMessage>
        <S.OkButtonWrap onPress={() => setIsErrorModalVisible(false)}>
          <S.OkButtonText fStyle={'caption700'} color={'green'} fSize={20}>
            OK
          </S.OkButtonText>
        </S.OkButtonWrap>
      </S.ErrorModalWrap>
    </Modal>
  );
}
