import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  padding: 12px 12px 0px 6px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 2px 0 6px;
`;

export const HeaderWithIcon = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderText = styled(UDText)`

`;

export const HeaderIcon = styled.Image`
  margin-left: 4px;
`;

export const Button = styled.TouchableOpacity`
  width: 83px;
  height: 30px;
  background-color: ${props => props.theme.colors.green};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(UDText)`
  line-height: 20px;
`;

export const FlatListWrap = styled.View`
  padding-top: 12px;
`;

export const FlatList = styled.FlatList``;

export const EmptySimilarWrap = styled.View`
  justify-content: center;
  align-items: center;
  height: 156px;
`;
export const EmptySimilarIcon = styled(FastImage)`
  height: 53px;
  width: 53px;
`;
export const EmptySimilarText = styled(UDText)``;
