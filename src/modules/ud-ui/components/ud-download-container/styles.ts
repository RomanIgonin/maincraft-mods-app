import styled from '@emotion/native';
import FastImage from 'react-native-fast-image';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';

export const Container = styled.View`
  background-color: #f2f2f2;
`;

export const ShadowCarousel = styled.View`
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 4px rgba(0, 0, 0, 0.15);` : ''};
  elevation: 5;
  background-color: #f2f2f2;
`;

export const Image = styled(FastImage)`
  height: 220px;
  width: 100%;
`;

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

export const ShareWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 14px;
`;

export const Share = styled(FastImage)`
  height: 31px;
  width: 32px;
`;

export const LikeWrap = styled.TouchableOpacity`
  position: absolute;
  right: 12px;
  top: 200px;
  align-items: center;
`;

interface LikeProps {
  isLikePress: boolean;
}
export const LikeBg = styled.View<LikeProps>`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background-color: ${props =>
    props.isLikePress ? props.theme.colors.pinkLight : '#eaeaea'};
  elevation: 5;
  box-shadow: ${Platform.OS === 'ios' ? `0 2px 5px rgba(0, 0, 0, 0.25);` : ''};
  align-items: center;
  padding-top: 10px;
`;

export const Like = styled(FastImage)`
  height: 25px;
  width: 25px;
`;

export const LikeCounter = styled(UDText)`
  padding-top: 6px;
  color: rgba(0, 0, 0, 0.35);
`;

export const NameCategoryItem = styled(UDText)`
  margin: 16px 60px 0 16px;
`;

export const DetailsWrap = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 8px 60px 0 16px;
`;

export const SizeIcon = styled.Image`
  margin-right: 4px;
  width: 30px;
  height: 24px;
`;

export const DetailsBottomText = styled(UDText)`
  color: rgba(0, 0, 0, 0.4);
`;

export const DownloadIcon = styled.Image`
  margin: 0 2px 4px 6px;
  width: 23px;
  height: 22px;
`;

export const VersionsIcon = styled.Image`
  margin-left: 4px;
  width: 34px;
  height: 26px;
`;

export const DownloadWrap = styled.TouchableOpacity`
  margin: 12px 50px 0 50px;
  justify-content: center;
`;

export const DownloadTextWrap = styled.View`
  position: absolute;
  z-index: 1;
  top: -1px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  text-align: center;
  justify-content: center;
`;

export const DownloadText = styled(UDText)`
  padding: 12px;
  line-height: 30px;
`;

export const DownloadVideoIcon = styled.Image`
  margin-bottom: 2px;
`;

export const ErrorModalWrap = styled.View`
  background-color: ${props => props.theme.colors.light};
  border-radius: 20px;
  padding: 16px 28px;
`;

export const Title = styled(UDText)`
  color: #2e2e2e;
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
`;

export const ErrorMessage = styled(UDText)`
  color: #2e2e2e;
`;

export const OkButtonWrap = styled.TouchableOpacity`
  align-items: flex-end;
  margin-top: 16px;
`;
export const OkButtonText = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
`;
