import styled from '@emotion/native';
import { UDText } from '@styles/typography';
import { Platform } from 'react-native';
import FastImage from 'react-native-fast-image';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.backgroundLight};
`;

export const HeaderBgWrap = styled.View`
  ${Platform.OS === 'ios'
    ? 'box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);'
    : 'elevation: 10;'};
  background-color: rgb(255, 255, 255);
`;

export const HeaderBg = styled(FastImage)`
  height: 60px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const ArrowLeft = styled.Image`
  margin-left: 16px;
`;

export const SearchWrap = styled.TouchableOpacity`
  flex: 1;
  height: 44px;
  margin-horizontal: 16px;
  background-color: rgba(0, 0, 0, 0.13);
  border-radius: 10px;
  padding-left: 16px;
  flex-direction: row;
`;

type SearchProps = {
  value?: string;
};
export const Search = styled.TextInput<SearchProps>`
  flex: 1;
  font-size: 15px;
  font-family: ${props =>
    props.value ? props.theme.fonts.caption700 : props.theme.fonts.pixel};
  color: ${props => props.theme.colors.light};
  font-weight: ${Platform.select({
    ios: '700;',
    android: '',
  })}
})
`;

interface SearchButtonProps {
  searchQuery: string;
}
export const SearchButtonWrap = styled.TouchableOpacity<SearchButtonProps>`
  height: 44px;
  width: 44px;
  padding-left: ${props => (props.searchQuery ? '12px' : '8px')};
  justify-content: center;
`;

export const SearchButton = styled.Image``;

export const CategoriesWrap = styled.View`
  padding: 18px 12px 18px 12px;
  flex-direction: row;
  justify-content: space-between;
`;

interface CategoryProps {
  isSelected: boolean;
}
export const CategoryWrap = styled.TouchableOpacity<CategoryProps>`
  background-color: ${props =>
    props.isSelected ? props.theme.colors.green : props.theme.colors.grayLight};
  border-radius: 20px;
`;

export const Category = styled(UDText)<CategoryProps>`
  color: ${props => (props.isSelected ? props.theme.colors.light : '#575757')};
  padding: 4px 18px;
`;

export const HintsWrap = styled.View`
  align-items: center;
`;

export const Hint = styled(UDText)`
  color: #303030;
  margin-bottom: 14px;
`;
