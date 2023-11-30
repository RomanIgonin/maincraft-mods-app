import styled from '@emotion/native';
import { Dimensions, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const HeaderShadow = styled.View`
  ${Platform.OS === 'ios'
    ? `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);`
    : 'elevation: 10;'};
  background-color: rgb(255, 255, 255);
  width: 100%;
`;

export const Wrap = styled.View`
  width: 100%;
  padding: 0 12px;
`;

const widthScreen = Dimensions.get('screen').width;
const heightPremium = widthScreen / 2.97 + 'px';
export const PremiumButtonWrap = styled.TouchableOpacity`
  height: ${heightPremium};
  width: 100%;
`;

export const PremiumButton = styled(FastImage)`
  height: 100%;
  width: 100%;
  margin: 20px 0;
`;

export const ButtonsWrap = styled.View`
  flex-direction: row;
  margin: 26px 0 0 0;
`;

export const DiscordYoutubeWrap = styled.View`
  flex: 1;
`;

export const DiscordWrap = styled.TouchableOpacity``;

const heightDiscord = widthScreen / 6 + 'px';
export const DiscordButton = styled(FastImage)`
  width: 100%;
  height: ${heightDiscord};
`;

export const YoutubeWrap = styled.TouchableOpacity``;

export const YoutubeButton = styled(FastImage)`
  width: 100%;
  height: ${heightDiscord};
  margin: 4px 0 0 0;
`;

export const YourLikeListWrap = styled.TouchableOpacity`
  flex: 1;
`;

export const YourLikeListButton = styled(FastImage)`
  flex: 1;
  margin: 0 0 0 4px;
`;
