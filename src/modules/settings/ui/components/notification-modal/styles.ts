import styled from '@emotion/native/dist/emotion-native.cjs';
import { Platform, Switch } from 'react-native';
import { UDText } from '@styles/typography';

export const ModalContainer = styled.View`
  background-color: white;
  border-radius: 20px;
  padding: 20px 0 0 0;
  align-items: center;
  ${Platform.OS === 'ios'
    ? 'box-shadow: 0 0px 30px rgba(0, 0, 0, 0.25);'
    : 'elevation: 5;'};
`;

export const ModalHeader = styled(UDText)`
  color: #2e2e2e;
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
`;

export const SwitchAndTextWrap = styled.View`
  border-top-width: 1px;
  border-top-color: rgba(0, 0, 0, 0.3);
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  flex-direction: row;
  padding: 6px 0;
  margin: 16px 0 12px 0;
`;

export const TextWrap = styled.View`
  width: 80%;
  margin: 0 0 0 12px;
`;

export const NewAddonsText = styled(UDText)``;

export const PersonalizedText = styled(UDText)`
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: -0.2px;
  line-height: 16px;
  padding-top: 4px;
`;

export const SwitchNotificationWrap = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding-right: 6px;
`;

export const SwitchNotification = styled(Switch)``;

export const TapHereText = styled(UDText)`
  letter-spacing: -0.2px;
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  padding-top: 2px;
`;

export const ButtonOkWrap = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const ButtonWrap = styled.TouchableOpacity`
  width: 80px;
  align-items: center;
  margin: 24px 12px 12px 12px;
`;

export const ButtonOk = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  font-size: 21px;
`;
