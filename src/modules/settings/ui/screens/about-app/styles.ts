import styled from '@emotion/native';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { UDText } from '@styles/typography';

export const Container = styled.ScrollView`
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

export const Logo = styled(FastImage)`
  width: 105px;
  height: 105px;
  margin-top: 44px;
  align-self: center;
`;

export const Label = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  color: #444444;
  text-align: center;
  margin: 8px 34px 0 34px;
  line-height: 34px;
`;

export const WithTheHelpText = styled(UDText)`
  color: #444444;
  margin: 10px 34px 0 34px;
  text-align: center;
  line-height: 22px;
`;

export const MailText = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  line-height: 22px;
`;

export const FlatList = styled.FlatList`
  margin-top: 14px;
`;

interface ItemProps {
  isLastItem: boolean;
}
export const ItemWrap = styled.View<ItemProps>`
  border-top-width: 1.5px;
  border-top-color: rgba(0, 0, 0, 0.2);
  padding: 12px;
  align-items: center;
  border-bottom-width: ${props => (props.isLastItem ? '1.5px' : '0')};
  border-bottom-color: ${props =>
    props.isLastItem ? 'rgba(0, 0, 0, 0.2)' : ''};
`;

export const TouchableItemWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const MenuLabel = styled(UDText)`
  color: #5d5d5d;
  font-size: 21px;
  letter-spacing: -0.3px;
`;

export const VersionApp = styled(UDText)`
  color: rgba(68, 68, 68, 0.6);
  margin: 10px;
`;

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

export const DisclaimerText = styled(UDText)`
  color: #444444;
  margin: 10px 20px 0 20px;
  text-align: center;
  line-height: 22px;
  letter-spacing: -0.5px;
`;

export const ButtonOkWrap = styled.View`
  width: 100%;
  align-items: flex-end;
`;

export const ButtonWrap = styled.TouchableOpacity`
  width: 80px;
  align-items: center;
  margin: 16px 6px 12px 12px;
`;

export const ButtonOk = styled(UDText)`
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })};
  font-size: 21px;
`;
