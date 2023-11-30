import styled from '@emotion/native';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';
import { UDText } from '@styles/typography';

export const Container = styled.View`
  flex: 1;
  height: 218px;
  margin: 0 14px 14px 14px;
  border-radius: 10px;
`;

export const ListItem = styled.View`
  box-shadow: ${Platform.OS === 'ios' ? '0 2px 4px rgba(0, 0, 0, 0.15);' : ''};
  elevation: 5;
`;

export const ItemImage = styled(FastImage)`
  height: 166px;
  width: 100%;
  border-radius: 10px 10px 0 0;
`;

export const DetailsWrap = styled.View`
  height: 52px;
  background-color: ${props => props.theme.colors.light};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px 4px 16px;
  border-radius: 0 0 10px 10px;
`;

export const ModsNameWrap = styled.View`
  flex-direction: column;
  width: 64%;
`;

export const ModsName = styled(UDText)``;

export const DownloadWrap = styled.TouchableOpacity`
  background-color: ${props => props.theme.colors.green};
  justify-content: center;
  border-radius: 20px;
`;
export const DownloadText = styled(UDText)`
  padding: 10px 12px 8px 12px;
`;

export const ADWrap = styled(FastImage)`
  position: absolute;
  top: 10px;
  width: 90px;
  height: 36px;
  justify-content: center;
  align-items: center;
`;

export const ADText = styled(UDText)``;
