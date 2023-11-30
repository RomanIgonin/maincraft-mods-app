import React, { useCallback, useMemo, useState } from 'react';
import * as S from './styles';
import Modal from 'react-native-modal';
import { RadioButton } from 'react-native-paper';
import { theme } from '@styles/theme';
import useTranslationsStore from '@src/modules/translations/store';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import { FlatList, ListRenderItem } from 'react-native';
import { Language } from '@src/modules/translations/domain/interfaces/Language';

interface Props {
  openLanguage: boolean;
  setOpenLanguage: (bool: boolean) => void;
}

export default function LanguageModal(props: Props) {
  const { openLanguage, setOpenLanguage } = props;
  const { currentLanguage, changeLanguage } = useTranslationsStore();

  const { t } = useAppTranslation('languages');

  const [selectedLang, setSelectedLang] = useState(currentLanguage);

  const languages: Language[] = useMemo(
    () => [
      {
        id: 0,
        code: 'en',
        title: t('en'),
      },
      {
        id: 1,
        code: 'ru',
        title: t('ru'),
      },
    ],
    [t],
  );

  const onPressApply = useCallback(() => {
    setOpenLanguage(false);
    if (selectedLang) {
      changeLanguage(selectedLang);
    }
  }, [changeLanguage, selectedLang, setOpenLanguage]);

  const keyExtractor = (item: Language) => String(item.id);

  const renderItem: ListRenderItem<Language> = useCallback(
    ({ item }) => {
      return (
        <S.LanguageTypeWrap>
          <S.LanguageTypeText fStyle={'caption400'} fSize={20}>
            {item.title}
          </S.LanguageTypeText>
          <RadioButton
            value={item.title}
            color={theme.colors.green}
            status={selectedLang === item.code ? 'checked' : 'unchecked'}
            onPress={() => setSelectedLang(item.code)}
          />
        </S.LanguageTypeWrap>
      );
    },
    [selectedLang],
  );

  return (
    <Modal
      isVisible={openLanguage}
      backdropOpacity={0.3}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}>
      <S.ModalContainer>
        <S.ModalWrap>
          <S.ModalHeader fSize={24} fStyle={'caption700'}>
            {t('app_lang')}
          </S.ModalHeader>

          <S.RadioFieldWrap>
            <FlatList
              data={languages}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </S.RadioFieldWrap>

          <S.ButtonApplyWrap onPress={() => onPressApply()}>
            <S.ButtonApply fSize={20} color={'light'}>
              {t('apply')}
            </S.ButtonApply>
          </S.ButtonApplyWrap>
        </S.ModalWrap>
      </S.ModalContainer>
    </Modal>
  );
}
