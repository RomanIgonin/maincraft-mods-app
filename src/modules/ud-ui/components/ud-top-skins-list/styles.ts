import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import SkeletonContent from 'react-native-skeleton-content-nonexpo';

export const Container = styled.View`
  padding: 12px 12px 0px 6px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px 0 6px;
`;

export const Button = styled.TouchableOpacity`
  width: 83px;
  height: 30px;
  background-color: ${props => props.theme.colors.green};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const ListItemWrapper = styled.TouchableOpacity``;

export const SkeletonTopSkinsWrap = styled(SkeletonContent)`
  width: 170px;
  height: 234px;
  border-radius: 20px;
  flex: 1;
`;

export const TopSkins = styled.View`
  overflow: hidden;
  border-radius: 20px;
  elevation: 5;
  width: 170px;
  height: 234px;
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 3px rgba(0, 0, 0, 0.25);` : ''};
  margin: 0 6px 12px 6px;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const SkinsBgImage = styled(FastImage)`
  height: 234px;
  width: 100%;
`;

export const SkinsImage = styled(SkinsBgImage)``;

export const SkinsDetailWrap = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.theme.colors.light};
  border-radius: 20px;
  padding: 8px 32px 8px 32px;
`;

export const SkinsDownloadWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SkinsDownloadIcon = styled.Image``;

export const SkinsDownloadText = styled(UDText)`
  color: #5e5e5e;
  margin-left: 2px;
`;

export const SkinsLikeWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

export const SkinsLikeIcon = styled.Image`
  height: 19px;
  width: 19px;
`;

export const SkinsLikeText = styled(UDText)`
  color: #5e5e5e;
  margin-left: 4px;
`;

export const NewSkinsWrap = styled(FastImage)`
  position: absolute;
  top: 14px;
  left: 6px;
  width: 47px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const NewSkinsText = styled(UDText)``;
