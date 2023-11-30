import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import RenderHtml from 'react-native-render-html';
import { Platform } from 'react-native';

export const Container = styled.TouchableOpacity`
  padding: 0 14px;
  background-color: #f2f2f2;
`;

interface DescriptionWrapProps {
  isDescriptionOpen: boolean;
}
export const DescriptionWrap = styled.View<DescriptionWrapProps>`
  ${props =>
    props.isDescriptionOpen
      ? ''
      : 'position: absolute; left: 14px; height: 127px;'};
  overflow: hidden;
`;

export const HeaderWrap = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const HeaderText = styled(UDText)``;
export const HeaderArrow = styled(FastImage)`
  height: 24px;
  width: 24px;
  margin-left: 6px;
`;

export const RenderHtmlWrap = styled(RenderHtml)``;

export const Description = styled(UDText)`
  margin-top: 6px;
`;

export const Gradient = styled(LinearGradient)`
  height: 127px;
`;

export const WithoutGradient = styled.View`
  flex: 1;
`;

export const More = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })}
  margin-top: 6px;
`;

export const HideWrap = styled.TouchableOpacity``;

export const Hide = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })}
  margin-top: 6px;
`;
