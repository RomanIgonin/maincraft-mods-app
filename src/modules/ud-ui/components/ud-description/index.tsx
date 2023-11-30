import React, { useState } from 'react';
import * as S from './styles';
import {
  ARROW_DOWN_DESCRIPTION,
  ARROW_RIGHT_DESCRIPTION,
} from '@src/assets/constants/imagePaths';
import { Dimensions } from 'react-native';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import useTranslationsStore from '@src/modules/translations/store';

const { width } = Dimensions.get('window');

interface Props {
  categoryItem: CategoryItem;
}
export default function UDDescription(props: Props) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const { t } = useAppTranslation('description');
  const { currentLanguage } = useTranslationsStore();

  const { categoryItem } = props;

  const desc =
    currentLanguage && currentLanguage === 'en'
      ? categoryItem.desc.en
      : categoryItem.desc.ru;

  const onPressDescription = () => {
    setIsDescriptionOpen(!isDescriptionOpen);
  };
  const onPressHide = () => {
    setIsDescriptionOpen(false);
  };

  const headerArrowResolver = () => {
    return isDescriptionOpen ? ARROW_DOWN_DESCRIPTION : ARROW_RIGHT_DESCRIPTION;
  };

  const gradientResolver = () => {
    return isDescriptionOpen ? (
      <S.WithoutGradient />
    ) : (
      <S.Gradient
        colors={[
          'rgba(255,255,255,0)',
          'rgba(255,255,255,0)',
          'rgba(255,255,255,0)',
          '#f2f2f2',
        ]}
      />
    );
  };

  const hideMoreResolver = () => {
    return isDescriptionOpen ? (
      <S.HideWrap onPress={onPressHide} activeOpacity={1}>
        <S.Hide fStyle={'caption700'} fSize={20} color={'red'}>
          {t('hide')}
        </S.Hide>
      </S.HideWrap>
    ) : (
      <S.More fStyle={'caption700'} fSize={20} color={'green'}>
        {t('more')}
      </S.More>
    );
  };

  return (
    <S.Container onPress={onPressDescription} activeOpacity={1}>
      <S.DescriptionWrap isDescriptionOpen={isDescriptionOpen}>
        <S.HeaderWrap>
          <S.HeaderText color={'grayDark'} fSize={24}>
            {t('description')}
          </S.HeaderText>
          <S.HeaderArrow source={headerArrowResolver()} />
        </S.HeaderWrap>

        <S.RenderHtmlWrap
          contentWidth={width}
          source={{
            html: desc,
          }}
        />
      </S.DescriptionWrap>

      {gradientResolver()}
      {hideMoreResolver()}
    </S.Container>
  );
}
