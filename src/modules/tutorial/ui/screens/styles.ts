import styled from '@emotion/native';
import { Platform } from 'react-native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  background-color: #f2f2f2;
`;

export const HeaderShadow = styled.View`
  ${Platform.OS === 'ios'
    ? 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);'
    : 'elevation: 10;'};
  background-color: rgb(255, 255, 255);
  width: 100%;
`;

export const FlatList = styled.FlatList`
  padding: 10px 0;
`;

export const ShadowItemWrap = styled.View`
  ${Platform.OS === 'ios' ? 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);' : ''};
`;

interface ItemProps {
  isLastItem: boolean;
}
export const ItemWrap = styled.View<ItemProps>`
  height: 272px;
  background-color: #fbfbfb;
  border-radius: 20px;
  overflow: hidden;
  elevation: 10;
  margin: 10px 10px ${props => (props.isLastItem ? '40px' : '10px')} 10px;
`;

export const BgImage = styled(FastImage)`
  height: 200px;
  justify-content: center;
`;

export const TitleText = styled(UDText)`
  position: absolute;
  width: 210px;
  text-align: center;
  align-self: center;
  line-height: 33px;
`;

export const ButtonWrap = styled.TouchableOpacity`
  height: 72px;
  justify-content: center;
`;

export const ButtonTextWrap = styled.View`
  background-color: ${props => props.theme.colors.green};
  padding: 8px 38px;
  align-self: center;
  border-radius: 20px;
`;

export const ButtonText = styled(UDText)`
  line-height: 30px;
`;
