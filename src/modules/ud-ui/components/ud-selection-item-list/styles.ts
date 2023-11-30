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

export const SkeletonItemWrap = styled(SkeletonContent)`
  width: 238px;
  height: 144px;
  border-radius: 10px;
  flex: 1;
`;

export const ListItemWrap = styled.View`
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 3px rgba(0, 0, 0, 0.25);` : ''};
  margin: 0 6px 12px 6px;
  background-color: white;
  border-radius: 10px;
`;

export const ListItem = styled.View`
  overflow: hidden;
  width: 238px;
  height: 144px;
  border-radius: 10px;
  elevation: 5;
`;

export const ImageWrapper = styled.TouchableOpacity``;

export const NewWrap = styled(FastImage)`
  position: absolute;
  top: 10px;
  width: 64px;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const NewText = styled(UDText)``;

export const ItemImage = styled(FastImage)`
  height: 110px;
  width: 100%;
`;

export const DetailsWrap = styled.View`
  height: 34px;
  background-color: ${props => props.theme.colors.light};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 10px 4px 10px;
`;

export const DetailsColumnWrap = styled.View`
  flex-direction: column;
  flex: 1;
`;

export const ModsName = styled(UDText)``;

export const DetailsBottom = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const SizeIcon = styled.Image`
  margin-right: 2px;
`;

export const DetailsBottomText = styled(UDText)`
  color: rgba(0, 0, 0, 0.4);
`;

export const DownloadIcon = styled.Image`
  margin-left: 2px;
`;

export const VersionsIcon = styled.Image`
  margin-left: 2px;
`;

interface LikeProps {
  isLikePress: boolean;
}
export const LikeWrap = styled.TouchableOpacity<LikeProps>`
  flex-direction: row;
  background-color: ${props =>
    props.isLikePress ? props.theme.colors.pinkLight : 'rgba(0, 0, 0, 0.1)'};
  height: 21px;
  width: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;

export const LikeIcon = styled.Image`
  width: 12px;
  height: 12px;
`;

export const LikeText = styled(UDText)<LikeProps>`
  color: ${props =>
    props.isLikePress ? props.theme.colors.redLight : 'rgba(0, 0, 0, 0.3)'};
  padding-left: 2px;
`;
