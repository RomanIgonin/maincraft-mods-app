import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Dimensions, Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundLight};
  padding-top: 20px;
`;

export const FlatListWrap = styled.View`
  flex: 1;
  align-items: center;
`;

export const FlatList = styled.FlatList``;

export const ListItemWrapper = styled.View`
  flex: 1;
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 3px rgba(0, 0, 0, 0.25);` : ''};
  height: 218px;
  margin: 0 14px 14px 14px;
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: 10px;
`;

export const ListItem = styled.View`
  overflow: hidden;
  border-radius: 10px;
  elevation: 5;
`;

export const NewWrap = styled(FastImage)`
  position: absolute;
  top: 10px;
  width: 90px;
  height: 36px;
  justify-content: center;
  align-items: center;
`;

export const NewText = styled(UDText)``;

export const NewSkinsWrap = styled(FastImage)`
  position: absolute;
  top: 14px;
  width: 47px;
  height: 24px;
  align-items: center;
  justify-content: center;
`;

export const NewSkinsText = styled(UDText)``;

export const ItemImageWrapper = styled.TouchableOpacity``;

export const ItemImage = styled(FastImage)`
  height: 166px;
  width: 100%;
`;

export const DetailsWrap = styled.View`
  height: 52px;
  background-color: ${props => props.theme.colors.light};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 4px 12px 4px 16px;
`;

export const DetailsColumnWrap = styled.View`
  flex: 1;
  flex-direction: column;
  padding-right: 4px;
`;

export const ModsName = styled(UDText)``;

export const DetailsBottom = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const SizeIcon = styled(FastImage)`
  margin-right: 6px;
  height: 18px;
  width: 18px;
`;

export const DetailsBottomText = styled(UDText)`
  color: rgba(0, 0, 0, 0.4);
`;

export const DownloadIcon = styled(FastImage)`
  margin-horizontal: 4px;
  height: 16px;
  width: 16px;
`;

export const VersionsIcon = styled(FastImage)`
  margin-horizontal: 4px;
  height: 18px;
  width: 18px;
`;

interface LikeProps {
  isLikePress: boolean;
}
export const LikeWrap = styled.TouchableOpacity<LikeProps>`
  flex-direction: row;
  background-color: ${props =>
    props.isLikePress ? props.theme.colors.pinkLight : 'rgba(0, 0, 0, 0.1)'};
  height: 32px;
  width: 90px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

export const LikeIcon = styled(FastImage)`
  width: 19px;
  height: 18px;
  margin-top: 1px;
`;

export const LikeText = styled(UDText)<LikeProps>`
  color: ${props =>
    props.isLikePress ? props.theme.colors.redLight : 'rgba(0, 0, 0, 0.3)'};
  padding-left: 4px;
`;

interface TopSkinsWrapperProps {
  index: number;
}
export const TopSkinsWrapper = styled.View<TopSkinsWrapperProps>`
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 3px rgba(0, 0, 0, 0.25);` : ''};
  width: ${`${width / 2 - 26}px`};
  height: 234px;
  margin: ${props =>
    props.index % 2 == 0 ? '0 20px 20px 14px' : '0 14px 20px 0'};
  background-color: ${props => props.theme.colors.backgroundLight};
  border-radius: 20px;
`;

export const TopSkins = styled.View`
  overflow: hidden;
  elevation: 5;
  border-radius: 20px;
`;

export const SkinsImageWrap = styled.TouchableOpacity``;

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

export const SkinsDownloadIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
`;

export const SkinsDownloadText = styled(UDText)`
  color: #5e5e5e;
  margin-left: 2px;
`;

export const SkinsLikeWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

export const SkinsLikeIcon = styled(FastImage)`
  height: 20px;
  width: 20px;
`;

export const SkinsLikeText = styled(UDText)`
  color: #5e5e5e;
  margin-left: 4px;
`;
