import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import FastImage from 'react-native-fast-image';

export const CategoryWrap = styled.View`
  padding: 18px 12px 0 12px;
`;

export const CategoryTop = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const CategoryBottom = styled(CategoryTop)`
  margin-top: 16px;
`;

interface ContainerProps {
  label: string;
}
export const Container = styled.TouchableOpacity<ContainerProps>`
  flex: 1;
  height: 60px;
  border-radius: 20px;
  overflow: hidden;
  margin-left: ${props =>
    props.label === 'Mods' || props.label === 'Seeds' ? '12px' : '0px'};
`;

export const ImageBg = styled(FastImage)`
  height: 60px;
  align-items: center;
  justify-content: center;
`;

export const Label = styled(UDText)``;
