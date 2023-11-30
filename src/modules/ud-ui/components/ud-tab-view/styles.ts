import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
`;

export const TabBarShadow = styled.View`
  z-index: 1;
  ${Platform.OS === 'ios'
    ? `box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);`
    : 'elevation: 10;'};
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const TabBarWrap = styled(FastImage)`
  flex-direction: row;
  height: 36px;
  padding-horizontal: 14px;
  justify-content: space-around;
`;

export const ScrollView = styled.ScrollView``;

export const TabBarItemWrap = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 10px 6px 10px;
`;

export const TabBarItemText = styled(UDText)``;

export const UnderLine = styled.View`
  position: absolute;
  height: 4px;
  width: 120%;
  bottom: 0;
  background-color: ${props => props.theme.colors.light};
`;
