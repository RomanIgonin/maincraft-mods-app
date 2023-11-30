import React, { useState } from 'react';
import * as S from './styles';
import {
  ARROW_DOWN_DESCRIPTION,
  ARROW_RIGHT_DESCRIPTION,
} from '@src/assets/constants/imagePaths';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function UDDescription() {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);

  const mockHtml = {
    html: `
    <p><strong>Author: o seu velho amigo TNT</strong></p>
    <p><strong>Important:</strong> when creating new world, please enable on these <a href='http://u1443067.cp.regruhosting.ru/mods/img/squid-game-rampage-addon_2.jpeg'>4 experiments option</a> in the Game tab.</p>
    <p>If you don't know how install the mod, you can <a href='https://www.youtube.com/watch?v=DLB-TgPeias'}>watch this video</a></p>
    <p><img src=http://u1443067.cp.regruhosting.ru/mods/img/squid-game-rampage-addon_2.jpeg alt="img" /></p>
  `,
  };

  const onPressDescription = () => {
    setIsDescriptionOpen(true);
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
        ]}></S.Gradient>
    );
  };

  const hideMoreResolver = () => {
    return isDescriptionOpen ? (
      <S.HideWrap onPress={onPressHide} activeOpacity={1}>
        <S.Hide fStyle={'caption700'} fSize={20} color={'red'}>
          Hide
        </S.Hide>
      </S.HideWrap>
    ) : (
      <S.More fStyle={'caption700'} fSize={20} color={'green'}>
        More
      </S.More>
    );
  };

  return (
    <S.Container onPress={onPressDescription} activeOpacity={1}>
      <S.DescriptionWrap isDescriptionOpen={isDescriptionOpen}>
        <S.HeaderWrap>
          <S.HeaderText color={'grayDark'} fSize={24}>
            Description
          </S.HeaderText>
          <S.HeaderArrow source={headerArrowResolver()} />
        </S.HeaderWrap>

        <S.RenderHtmlWrap contentWidth={width} source={mockHtml} />
      </S.DescriptionWrap>

      {gradientResolver()}
      {hideMoreResolver()}
    </S.Container>
  );
}
