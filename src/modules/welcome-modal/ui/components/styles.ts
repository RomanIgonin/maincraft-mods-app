import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const ModalWrap = styled.View`
  background-color: #fdfdfd;
  align-items: center;
  border-radius: 20px;
  padding: 14px 0 0 0;
`;

export const ModalHeader = styled(UDText)`
  color: #2e2e2e;
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  text-align: center;
  line-height: 34px;
  width: 250px;
`;

export const ModalTextWrap = styled.View`
  margin: 8px 18px 0 18px;
`;
export const ModalText = styled(UDText)`
  color: #2e2e2e;
  text-align: center;
  line-height: 24px;
  font-size: 19px;
`;

export const ButtonWrap = styled.TouchableOpacity``;

export const ButtonOk = styled(FastImage)`
  width: 225px;
  height: 56px;
  margin: 16px 0 0 0;
`;

export const ButtonCancel = styled(FastImage)`
  width: 225px;
  height: 56px;
  margin: 16px 0 28px 0;
`;

export const ButtonContinue = styled(ButtonCancel)``;

export const ButtonNotNow = styled(UDText)`
  color: #404040;
  font-size: 19px;
  margin: 2px 0 12px 0;
  width: 225px;
  height: 50px;
  text-align: center;
  padding-top: 8px;
`;

export const ImageBg = styled(FastImage)`
  position: absolute;
  z-index: -1;
`;

export const ImageBgCow = styled(ImageBg)`
  width: 250px;
  height: 300px;
  top: -158px;
`;

export const ImageBgNotification = styled(ImageBg)`
  width: 350px;
  height: 200px;
  top: -174px;
`;

export const ImageStars = styled(FastImage)`
  width: 264px;
  height: 48px;
  margin: 14px 0 14px 0;
`;

export const ImageBgRateApp = styled.Image`
  position: absolute;
  z-index: -1;
  top: -222px;
`;
