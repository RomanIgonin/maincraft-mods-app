import styled from '@emotion/native';
import FastImage from 'react-native-fast-image';
import { UDText } from '@styles/typography';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundLight};
  margin-top: 14px;
`;

interface ItemProps {
  isLastItem: boolean;
}
export const ItemWrap = styled.View<ItemProps>`
  border-top-width: 1.5px;
  border-top-color: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-bottom-width: ${props => (props.isLastItem ? '1.5px' : '0')};
  border-bottom-color: ${props =>
    props.isLastItem ? 'rgba(0, 0, 0, 0.2)' : ''};
  margin-bottom: ${props => (props.isLastItem ? '44px' : '0')};
`;

export const TouchableItemWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

export const Icon = styled(FastImage)`
  width: 32px;
  height: 32px;
`;

export const Label = styled(UDText)`
  padding: 0 0 0 10px;
  color: #5d5d5d;
  font-size: 21px;
  letter-spacing: -0.3px;
`;
