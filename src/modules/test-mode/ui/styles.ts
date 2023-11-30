import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';

export const TestMode = styled(UDText)`
  position: absolute;
  color: rgb(255, 0, 0);
  right: 0;
  ${Platform.OS === 'ios' ? 'top: 40px;' : ''};
  font-size: 16px;
  background-color: rgba(255, 255, 255, 0.5);
  line-height: 20px;
  padding: 1px;
`;
