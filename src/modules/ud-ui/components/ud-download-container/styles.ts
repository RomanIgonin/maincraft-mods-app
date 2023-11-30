import styled from '@emotion/native';
import FastImage from 'react-native-fast-image';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';

export const Container = styled.View`
  background-color: #f2f2f2;
`;

export const ShadowCarousel = styled.View`
  box-shadow: ${Platform.OS === 'ios' ? '0 2px 4px rgba(0, 0, 0, 0.15);' : ''};
  elevation: 5;
  background-color: #f2f2f2;
`;

export const SkinsImageWrap = styled.View`
  height: 385px;
  width: 100%;
`;

export const SkinsBgImage = styled(FastImage)`
  height: 100%;
  width: 100%;
`;

export const SkinsImage = styled(SkinsBgImage)``;

export const SkinsCounter = styled(UDText)`
  position: absolute;
  bottom: 12px;
  left: 12px;
  letter-spacing: -0.7px;
  color: rgba(255, 255, 255, 0.8);
`;

export const Image = styled(FastImage)`
  height: 220px;
  width: 100%;
`;

export const ArrowBackWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  left: 0;
  padding: 14px;
`;

export const ArrowBack = styled(FastImage)`
  height: 31px;
  width: 32px;
`;

export const ShareWrap = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  right: 0;
  padding: 14px;
`;

export const Share = styled(FastImage)`
  height: 31px;
  width: 32px;
`;

interface LikeWrapProps {
  isSkinsCategory: boolean;
}
export const LikeWrap = styled.TouchableOpacity<LikeWrapProps>`
  position: absolute;
  right: 12px;
  top: ${props => (props.isSkinsCategory ? '330px' : '200px')};
  align-items: center;
`;

interface LikeProps {
  isLikePress: boolean;
  isSkinsCategory: boolean;
}
export const LikeBg = styled.View<LikeProps>`
  height: 42px;
  width: 42px;
  border-radius: 21px;
  background-color: ${props =>
    props.isLikePress
      ? props.theme.colors.pinkLight
      : props.isSkinsCategory
      ? 'rgba(234,234,234,0.7)'
      : '#eaeaea'};
  elevation: 5;
  box-shadow: ${Platform.OS === 'ios' ? '0 2px 5px rgba(0, 0, 0, 0.25);' : ''};
  align-items: center;
  padding-top: 10px;
`;

export const Like = styled(FastImage)`
  margin-left: 1px;
  height: 25px;
  width: 25px;
`;

export const LikeCounter = styled(UDText)`
  padding-top: 5px;
  bottom: 23px;
  left: 12px;
  color: rgba(0, 0, 0, 0.35);
`;

export const NameCategoryItem = styled(UDText)`
  margin: 16px 60px 0 16px;
`;

interface DetailsWrapProps {
  isSkinsCategory: boolean;
}
export const DetailsWrap = styled.View<DetailsWrapProps>`
  flex-direction: row;
  align-items: center;
  margin: 8px 16px 0 16px;
  ${props => (props.isSkinsCategory ? 'justify-content: center;' : '')};
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
  margin: 0 2px 4px 3px;
  width: 23px;
  height: 22px;
`;

export const VersionsIcon = styled.Image`
  margin-left: 2px;
  width: 34px;
  height: 26px;
`;

export const LikeDetails = styled(FastImage)`
  height: 20px;
  width: 20px;
  margin: 0 4px 0 7px;
`;

interface DownloadButtonsPanelProps {
  isSkinsCategory: boolean;
}
export const DownloadButtonsPanel = styled.View<DownloadButtonsPanelProps>`
  flex-direction: row;
  margin: ${props =>
    props.isSkinsCategory ? '24px 20px 0 20px' : '12px 50px 0 50px'};
  justify-content: space-between;
`;

export const SkinsLeftArrowWrap = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
`;

export const SkinsLeftArrow = styled(FastImage)`
  height: 100%;
  width: 100%;
`;

export const SkinsArrowRightWrap = styled(SkinsLeftArrowWrap)``;

export const SkinsRightArrow = styled(FastImage)`
  height: 50px;
  width: 50px;
`;

export const DownloadWrap = styled.TouchableOpacity<DownloadButtonsPanelProps>`
  flex: 1;
  margin: ${props => (props.isSkinsCategory ? '0 12px' : '')};
`;

export const DownloadTextWrap = styled.View`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const DownloadText = styled(UDText)`
  font-size: 23px;
  line-height: 34px;
`;

export const DownloadVideoIcon = styled.Image`
  margin: 0 0 2px 4px;
`;

export const SeedKey = styled(UDText)`
  align-self: center;
  margin: 8px 20px 0 20px;
`;

export const HowToInstallWrap = styled.TouchableOpacity<DownloadButtonsPanelProps>`
  flex-direction: row;
  background-color: #5794ef;
  margin: ${props =>
    props.isSkinsCategory ? '12px 20px 4px 20px' : '12px 50px 4px 50px'};
  border-radius: 10px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

export const HowToInstallText = styled(UDText)`
  font-size: 23px;
  line-height: 34px;
`;

export const PlayIcon = styled(FastImage)`
  height: 27px;
  width: 27px;
  margin: 0 0 0 4px;
`;
