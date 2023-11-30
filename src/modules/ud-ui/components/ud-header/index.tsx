import React from 'react';
import * as S from './styles';
import {
  ARROW_LEFT,
  BG_TOP_BAR,
  DISCORD,
  MAGNIFIER_LIGHT,
  OPTIONS,
} from '@src/assets/constants/imagePaths';

interface Props {
  title: string;
  arrowBackButton?: boolean;
  optionsButton?: boolean;
  searchButton?: boolean;
  discordButton?: boolean;
  onPressArrowBack?: () => void;
  onPressSearch?: () => void;
  onPressOptions?: () => void;
}

export default function UDHeader(props: Props) {
  const {
    title,
    arrowBackButton = false,
    optionsButton = false,
    searchButton = false,
    discordButton = false,
    onPressArrowBack,
    onPressSearch,
    onPressOptions,
  } = props;

  return (
    <S.Container source={BG_TOP_BAR}>
      <S.TitleHeaderWrap>
        <S.Title fStyle={'pixel'} fSize={27} color={'light'}>
          {title}
        </S.Title>

        {arrowBackButton && (
          <S.ArrowBackWrap onPress={onPressArrowBack}>
            <S.ArrowBack source={ARROW_LEFT} />
          </S.ArrowBackWrap>
        )}

        {optionsButton && (
          <S.OptionsWrap onPress={onPressOptions}>
            <S.ArrowBack source={OPTIONS} />
          </S.OptionsWrap>
        )}

        {searchButton && (
          <S.SearchWrap onPress={onPressSearch}>
            <S.ArrowBack source={MAGNIFIER_LIGHT} />
          </S.SearchWrap>
        )}

        {discordButton && !searchButton && (
          <S.DiscordWrap>
            <S.DiscordButton source={DISCORD} />
          </S.DiscordWrap>
        )}
      </S.TitleHeaderWrap>
    </S.Container>
  );
}
