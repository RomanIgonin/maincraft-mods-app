import styled from '@emotion/native';
import {
  resolveFontFamily,
  resolveTextColor,
  resolveTextFontSize,
  resolveTextLineHeight,
} from '@src/styles/typography/helpers';
import { UDTextProps } from '@src/styles/typography/types';

export const UDText = styled.Text<UDTextProps>`
  color: ${props => resolveTextColor(props)};
  font-size: ${props => resolveTextFontSize(props)};
  line-height: ${props => resolveTextLineHeight(props)};
  ${props => resolveFontFamily(props)};
`;
