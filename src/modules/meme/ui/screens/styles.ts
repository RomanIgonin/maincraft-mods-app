import styled from '@emotion/native';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { UDText } from '@styles/typography';
import RenderHtml from 'react-native-render-html';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const HeaderShadow = styled.View`
  ${Platform.OS === 'ios'
    ? 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);'
    : 'elevation: 10;'};
  background-color: rgb(255, 255, 255);
  width: 100%;
`;

interface RenderItemProps {
  isLastItem: boolean;
}
export const RenderItemWrap = styled.View<RenderItemProps>`
  background-color: #fbfbfb;
  margin: 22px 0 ${props => (props.isLastItem ? '22px' : '0')} 0;
  border-radius: 20px;
  ${Platform.OS === 'ios'
    ? 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);'
    : 'elevation: 8;'};
`;

export const Label = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 13px 0 0 10px;
`;

export const DisplayPicture = styled(FastImage)`
  height: 38px;
  width: 38px;
  border-radius: 19px;
`;

export const LabelText = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  margin: 0 0 0 6px;
  color: #464646;
  letter-spacing: -0.5px;
`;

export const VerifiedIcon = styled(FastImage)`
  height: 12px;
  width: 12px;
  margin: 0 0 0 4px;
`;

export const PostTextWrap = styled.View`
  margin: 6px 12px;
`;

export const RenderHtmlText = styled(RenderHtml)``;

export const PostImage = styled(FastImage)`
  width: 100%;
  height: 170px;
  align-self: center;
`;

export const ButtonsWrap = styled.View`
  height: 72px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DownloadButton = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.green};
  height: 37px;
  justify-content: center;
  padding: 0 20px;
  border-radius: 20px;
`;

interface LikeProps {
  isLikePress: boolean;
}
export const LikeButton = styled.TouchableOpacity<LikeProps>`
  flex-direction: row;
  background-color: ${props =>
    props.isLikePress ? props.theme.colors.pinkLight : 'rgba(0, 0, 0, 0.1)'};
  height: 37px;
  width: 104px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-left: 6px;
`;

export const LikeIcon = styled(FastImage)`
  width: 25px;
  height: 24px;
  margin-top: 1px;
`;

export const LikeText = styled(UDText)<LikeProps>`
  color: ${props =>
    props.isLikePress ? props.theme.colors.redLight : 'rgba(0, 0, 0, 0.3)'};
  padding-left: 4px;
`;

export const ShareButton = styled.TouchableOpacity`
  background-color: rgba(0, 0, 0, 0.1);
  height: 37px;
  width: 55px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-left: 6px;
`;

export const ShareIcon = styled(FastImage)`
  width: 25px;
  height: 25px;
`;

export const BannerWrap = styled.View`
  height: 250px;
`;
