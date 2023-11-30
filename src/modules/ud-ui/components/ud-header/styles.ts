import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';

export const Container = styled(FastImage)`
  height: 60px;
  width: 100%;
  align-items: center;
`;

export const TitleHeaderWrap = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Title = styled(UDText)``;

export const ArrowBackWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  left: 0px;
  padding: 14px;
`;

export const ArrowBack = styled(FastImage)`
  height: 31px;
  width: 32px;
`;

export const OptionsWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 54px;
  padding: 16px 10px 16px 16px;
`;

export const Options = styled(FastImage)`
  height: 27px;
  width: 27px;
`;

export const SearchWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 16px 16px 16px 10px;
`;

export const Search = styled(FastImage)`
  height: 28px;
  width: 28px;
`;

export const DiscordWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 10px 12px 10px 10px;
`;

export const DiscordButton = styled(FastImage)`
  width: 39px;
  height: 39px;
  border-radius: 20px;
  align-self: center;
`;
