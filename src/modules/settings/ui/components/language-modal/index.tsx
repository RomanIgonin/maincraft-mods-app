import React, { useState } from 'react';
import * as S from './styles';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import { theme } from '@styles/theme';

type Language = 'English' | 'Russian';

interface Props {
  openLanguage: boolean;
  setOpenLanguage: (bool: boolean) => void;
}

export default function LanguageModal(props: Props) {
  const { openLanguage, setOpenLanguage } = props;

  const [selectedLanguage, setSelectedLanguage] = useState<Language>('English');

  const RadioElement = ({ title }) => {
    return (
      <S.LanguageTypeWrap>
        <S.LanguageTypeText fStyle={'caption400'} fSize={20}>
          {title}
        </S.LanguageTypeText>
        <RadioButton
          value={title}
          color={theme.colors.green}
          status={selectedLanguage === title ? 'checked' : 'unchecked'}
          onPress={() => setSelectedLanguage(title)}
        />
      </S.LanguageTypeWrap>
    );
  };

  return (
    <Modal
      isVisible={openLanguage}
      backdropOpacity={0.3}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onRequestClose={() => setOpenLanguage(false)}>
      <S.ModalContainer>
        <S.ModalWrap>
          <S.ModalHeader fSize={24} fStyle={'caption700'}>
            Application Language
          </S.ModalHeader>

          <S.RadioFieldWrap>
            <RadioElement title={'English'} />
            <RadioElement title={'Russian'} />
          </S.RadioFieldWrap>

          <S.ButtonApplyWrap onPress={() => setOpenLanguage(false)}>
            <S.ButtonApply fSize={20} color={'light'}>
              Cancel
            </S.ButtonApply>
          </S.ButtonApplyWrap>
        </S.ModalWrap>
      </S.ModalContainer>
    </Modal>
  );
}
