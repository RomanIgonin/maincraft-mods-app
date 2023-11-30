import React, { useState } from 'react';
import * as S from './styles';
import {
  ARROW_LEFT,
  BG_TOP_BAR,
  CLOSE,
  MAGNIFIER,
} from '@src/assets/constants/imagePaths';
import { TouchableOpacity } from 'react-native';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import { CategoriesArray } from '@src/modules/search/domain/constants/categoryArray';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import UDList from '@src/modules/ud-ui/components/ud-list';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { RouteProp } from '@react-navigation/native';

const MockSearchHints = [
  'Hagi Wagi',
  'Winter',
  'Dino',
  'Hagi Wagi',
  'Winter',
  'Dino',
  'Hagi Wagi',
  'Winter',
  'Dino',
];

type Props = {
  route: RouteProp<
    {
      params: {
        categoryType: CategoryType;
      };
    },
    'params'
  >;
};

export default function SearchScreen({ route }: Props) {
  const categoryType = route.params.categoryType;

  const { mods } = useModsStore();
  const { maps } = useMapsStore();
  const { skins } = useSkinsStore();
  const { seeds } = useSeedsStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchCategory, setSearchCategory] = useState<CategoryType>(
    categoryType || 'mods',
  );
  const [filteredList, setFilteredList] = useState<CategoryItem[]>([]);

  const onPressArrowLeft = () => {
    navigateBack();
  };

  const SearchButton = () => {
    return (
      <S.SearchButtonWrap
        searchQuery={searchQuery}
        onPress={() => setSearchQuery('')}>
        <S.SearchButton source={searchQuery ? CLOSE : MAGNIFIER} />
      </S.SearchButtonWrap>
    );
  };

  const onPressCategory = (item: CategoryType) => {
    setSearchCategory(item.toLowerCase());
    setSearchQuery('');
  };

  const onPressHint = (item: string) => {
    setSearchQuery(item);
  };

  const onChangeSearchQuery = (value: string) => {
    setSearchQuery(value);

    const requiredStore =
      searchCategory === 'mods'
        ? mods
        : searchCategory === 'maps'
        ? maps
        : searchCategory === 'skins'
        ? skins
        : seeds;

    const list = requiredStore.filter(item =>
      item.tags.toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredList(list);
  };

  const isSearchCategory = (item: any) => {
    return searchCategory === item.toLowerCase() ? true : false;
  };

  return (
    <S.Container>
      <S.HeaderBgWrap>
        <S.HeaderBg source={BG_TOP_BAR}>
          <TouchableOpacity onPress={onPressArrowLeft}>
            <S.ArrowLeft source={ARROW_LEFT} />
          </TouchableOpacity>

          <S.SearchWrap>
            <S.Search
              placeholder={'Search'}
              placeholderTextColor={'rgba(255,255,255,0.5)'}
              value={searchQuery}
              onChangeText={value => onChangeSearchQuery(value)}
              cursorColor={'#fff'}
            />

            <SearchButton />
          </S.SearchWrap>
        </S.HeaderBg>
      </S.HeaderBgWrap>

      <S.CategoriesWrap>
        {CategoriesArray.map(item => {
          return (
            <S.CategoryWrap
              isSelected={isSearchCategory(item)}
              onPress={() => onPressCategory(item)}>
              <S.Category isSelected={isSearchCategory(item)} fSize={13}>
                {item}
              </S.Category>
            </S.CategoryWrap>
          );
        })}
      </S.CategoriesWrap>

      {searchQuery === '' ? (
        <S.HintsWrap>
          {MockSearchHints.map(item => {
            return (
              <TouchableOpacity onPress={() => onPressHint(item)}>
                <S.Hint fSize={17}>{item}</S.Hint>
              </TouchableOpacity>
            );
          })}
        </S.HintsWrap>
      ) : (
        <UDList typeCategory={searchCategory} data={filteredList} />
      )}
    </S.Container>
  );
}
