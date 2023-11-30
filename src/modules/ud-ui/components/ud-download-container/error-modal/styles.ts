import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';

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
