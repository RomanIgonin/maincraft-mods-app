import styled from '@emotion/native';
import { Platform } from 'react-native';

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
