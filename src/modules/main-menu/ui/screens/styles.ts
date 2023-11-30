import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.ScrollView`
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const HeaderWrap = styled.View`
  flex: 1;
  padding: 0 11px 0 11px;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderBg = styled(FastImage)`
  height: 60px;
  width: 100%;
`;

export const PremiumWrap = styled.TouchableOpacity`
  width: 55px;
  height: 51px;
  align-items: center;
`;

export const CrownIcon = styled.Image``;

export const TimerBg = styled(FastImage)`
  height: 14px;
  width: 55px;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const Timer = styled(UDText)`
  line-height: 14px;
`;

export const SearchWrap = styled.TouchableOpacity`
  flex: 1;
  height: 44px;
  align-self: center;
  background-color: rgba(0, 0, 0, 0.13);
  padding: 0 16px;
  margin: 0 12px;
  border-radius: 10px;
  justify-content: center;
`;

export const SearchText = styled(UDText)`
  color: rgba(255, 255, 255, 0.5);
`;

export const Magnifier = styled.Image`
  position: absolute;
  right: 12px;
  top: 10px;
`;

export const DiscordIcon = styled(FastImage)`
  width: 39px;
  height: 39px;
  border-radius: 20px;
  align-self: center;
`;

export const NewAddonsWrap = styled.View`
  margin: 8px 12px 0 8px;
  elevation: 5;
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 3px rgba(0, 0, 0, 0.2);` : ''};
`;

export const ImageNewAddons = styled(FastImage)`
  height: 104px;
  width: 100%;
  padding-top: 24px;
`;

export const NewAddonsText = styled(UDText)`
  width: 180px;
  text-align: center;
  margin-left: 86px;
`;

interface ShadowCarouselProps {
  isImageDelayLoading: boolean;
}
export const ShadowCarousel = styled.View<ShadowCarouselProps>`
  ${props =>
    props.isImageDelayLoading
      ? ''
      : `box-shadow: ${
          Platform.OS === 'ios' ? `0 2px 3px rgba(0, 0, 0, 0.3);` : ''
        };
      elevation: 5;
      background-color: ${props.theme.colors.backgroundLight};`}
`;
