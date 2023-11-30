import * as S from './styles';
import Modal from 'react-native-modal';
import React, { useCallback, useEffect, useState } from 'react';
import { SortByType } from '@src/modules/core/interfaces/sortByType';
import { SortByAscending } from '@src/modules/core/interfaces/sortByAscending';
import { RadioButton } from 'react-native-paper';
import { theme } from '@styles/theme';

interface Props {
  isVisible: boolean;
  setIsVisible: (bool: boolean) => void;
  sort: (sortType: SortByType, sortByAscending: SortByAscending) => void;
}

export default function UDSortModal(props: Props) {
  const { isVisible, setIsVisible, sort } = props;

  const [sortType, setSortType] = useState<SortByType>('By default');
  const [sortByAscending, setSortByAscending] =
    useState<SortByAscending>('Ascending');

  useEffect(() => {
    setSortType('By default');
    setSortByAscending('Ascending');
  }, [isVisible]);

  const onPressRadioButton = ({ title }: any) => {
    const isTopSortType =
      title === 'Ascending' ? false : title !== 'Descending';
    if (isTopSortType) {
      setSortType(title);
    } else {
      setSortByAscending(title);
    }
  };

  const onPressApply = useCallback(() => {
    setIsVisible(false);
    sort(sortType, sortByAscending);
  }, [sortType, sortByAscending]);

  const onPressBackButton = () => {
    setIsVisible(false);
  };

  const RadioElement = ({ title }: any) => {
    const isSelectedSort =
      title === sortType ? true : title === sortByAscending;

    return (
      <S.SortTypeWrap>
        <S.SortTypeText fStyle={'caption400'}>{title}</S.SortTypeText>
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
            Sort
          </S.ModalHeader>

          <S.RadioFieldWrap>
            <RadioElement title={'By default'} />
            <RadioElement title={'By downloads'} />
            <RadioElement title={'By like'} />
          </S.RadioFieldWrap>

          <S.RadioFieldBottomWrap>
            <RadioElement title={'Ascending'} />
            <RadioElement title={'Descending'} />
          </S.RadioFieldBottomWrap>

          <S.ButtonApplyWrap onPress={onPressApply}>
            <S.ButtonApply fSize={20} color={'light'}>
              Apply
            </S.ButtonApply>
          </S.ButtonApplyWrap>
        </S.ModalWrap>
      </S.ModalContainer>
    </Modal>
  );
}
