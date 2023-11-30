import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalWrap = styled.View`
  background-color: white;
  border-radius: 20px;
  padding: 16px 0 0 0;
  align-items: center;
  elevation: 5;
  box-shadow: ${Platform.OS === 'ios' ? '0 0px 30px rgba(0, 0, 0, 0.25);' : ''};
  width: 80%;
`;

export const ModalHeader = styled(UDText)`
  color: #2e2e2e;
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
`;

export const RadioFieldWrap = styled.View`
  width: 100%;
  padding: 0 26px 0 26px;
`;

export const RadioFieldBottomWrap = styled.View`
  margin-top: 24px;
  width: 100%;
  padding: 0 26px 0 26px;
`;

export const SortTypeWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;
`;

export const SortTypeText = styled(UDText)``;

export const RadioButton = styled(FastImage)`
  width: 20px;
  height: 20px;
`;

export const ButtonApplyWrap = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.green};
  height: 38px;
  width: 176px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  margin: 36px 0 28px 0;
`;

export const ButtonApply = styled(UDText)``;
