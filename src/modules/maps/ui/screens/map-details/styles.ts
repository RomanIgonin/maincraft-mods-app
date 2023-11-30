import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';
import { Dimensions } from 'react-native';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: #f2f2f2;
`;

export const BannerWrap = styled.View`
  margin-top: 16px;
  height: 206px;
  background-color: #d9d9d9;
  justify-content: center;
`;

export const Banner = styled.Text`
  text-align: center;
`;

export const DescriptionWrap = styled.View`
  margin-top: 16px;
  background-color: #d9d9d9;
  justify-content: center;
`;

export const SimilarWrap = styled.View``;

export const RemoveAdsWrap = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 4px;
`;

export const RemoveAds = styled(UDText)`
  color: rgba(48, 48, 48, 0.5);
`;

export const AdsWrap = styled.View``;

export const Ads = styled(UDText)`
  color: rgba(48, 48, 48, 0.5);
  margin-left: 6px;
  margin-top: 1px;
`;

export const AdsIcon = styled(FastImage)`
  position: absolute;
  right: 1px;
  height: 20px;
  width: 20px;
`;

export const RewardedVideoWrap = styled.View`
  position: absolute;
  height: ${Dimensions.get('screen')};
  width: ${Dimensions.get('screen')};
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  background-color: ${props => props.theme.colors.backgroundLight};
`;
