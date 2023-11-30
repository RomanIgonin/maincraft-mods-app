import * as S from './styles';
import Modal from 'react-native-modal';
import React, { useCallback, useState } from 'react';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import { RadioButton } from 'react-native-paper';
import { theme } from '@styles/theme';
import { TouchableOpacity } from 'react-native';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import useTranslationsStore from '@src/modules/translations/store';
import { LanguageCode } from '@src/modules/translations/domain/interfaces/Language';

interface Props {
  isVisible: boolean;
  setIsVisible: (bool: boolean) => void;
  sort: (
    sortType: SortByType,
    sortByAscending: SortByAscending,
    currentLanguage: LanguageCode,
  ) => void;
}

export default function UDSortModal(props: Props) {
  const { isVisible, setIsVisible, sort } = props;
  const { currentLanguage } = useTranslationsStore();
  const { t } = useAppTranslation('sort');
  const [sortType, setSortType] = useState(t('by_default'));
  const [sortByAscending, setSortByAscending] = useState(t('ascending'));

  const onPressRadioButton = ({ title }: any) => {
    const isTopSortType =
      title === t('ascending') ? false : title !== t('descending');
    if (isTopSortType) {
      setSortType(title);
    } else {
      setSortByAscending(title);
    }
  };

  const onPressApply = useCallback(() => {
    setIsVisible(false);
    const fSortType: SortByType =
      sortType === t('by_default')
        ? 'By default'
        : sortType === t('by_downloads')
        ? 'By downloads'
        : 'By like';
    const fSortByAscending: SortByAscending =
      sortByAscending === t('ascending') ? 'Ascending' : 'Descending';
    sort(fSortType, fSortByAscending, currentLanguage);
  }, [setIsVisible, sortType, sortByAscending, sort, currentLanguage]);

  const onPressBackButton = () => {
    setIsVisible(false);
  };

  const RadioElement = ({ title }: any) => {
    const isSelectedSort =
      title === sortType ? true : title === sortByAscending;

    return (
      <S.SortTypeWrap>
        <TouchableOpacity onPress={() => onPressRadioButton({ title })}>
          <S.SortTypeText fStyle={'caption400'}>{title}</S.SortTypeText>
        </TouchableOpacity>
        <RadioButton
          value={title}
          color={theme.colors.green}
          status={isSelectedSort ? 'checked' : 'unchecked'}
          onPress={() => onPressRadioButton({ title })}
        />
      </S.SortTypeWrap>
    );
  };

  return (
    <Modal
      isVisible={isVisible}
      backdropOpacity={0.3}
      animationIn={'zoomIn'}
      animationOut={'zoomOut'}
      onRequestClose={onPressBackButton}>
      <S.ModalContainer>
        <S.ModalWrap>
          <S.ModalHeader fSize={27} fStyle={'caption700'}>
            {t('sort')}
          </S.ModalHeader>

          <S.RadioFieldWrap>
            <RadioElement title={t('by_default')} />
            <RadioElement title={t('by_downloads')} />
            <RadioElement title={t('by_like')} />
          </S.RadioFieldWrap>

          <S.RadioFieldBottomWrap>
            <RadioElement title={t('ascending')} />
            <RadioElement title={t('descending')} />
          </S.RadioFieldBottomWrap>

          <S.ButtonApplyWrap onPress={onPressApply}>
            <S.ButtonApply fSize={20} color={'light'}>
              {t('apply')}
            </S.ButtonApply>
          </S.ButtonApplyWrap>
        </S.ModalWrap>
      </S.ModalContainer>
    </Modal>
  );
}
