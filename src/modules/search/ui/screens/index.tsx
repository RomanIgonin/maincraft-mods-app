import React, { useMemo, useState } from 'react';
import * as S from './styles';
import {
  ARROW_LEFT,
  BG_TOP_BAR,
  CLOSE,
  MAGNIFIER,
} from '@src/assets/constants/imagePaths';
import { TouchableOpacity } from 'react-native';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import UDList from '@src/modules/ud-ui/components/ud-list';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { RouteProp } from '@react-navigation/native';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import useHintsStore from '@src/modules/search/store';

type Props = {
  route?: RouteProp<
    {
      params: {
        categoryType: CategoryType;
      };
    },
    'params'
  >;
};

export default function SearchScreen({ route }: Props) {
  const categoryType = route?.params.categoryType;
  const { t } = useAppTranslation('shared');
  const { mods } = useModsStore();
  const { maps } = useMapsStore();
  const { skins } = useSkinsStore();
  const { seeds } = useSeedsStore();
  const { hints } = useHintsStore();

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

  const onPressCategory = (item: string) => {
    const fItem =
      item === t('mods')
        ? 'mods'
        : item === t('maps')
        ? 'maps'
        : item === t('skins')
        ? 'skins'
        : 'seeds';
    setSearchCategory(fItem);
    setSearchQuery('');
  };

  const onPressHint = (item: string) => {
    onChangeSearchQuery(item);
    setSearchQuery(item);
  };

  const CategoriesArray = useMemo(
    () => [t('mods'), t('maps'), t('skins'), t('seeds')],
    [t],
  );

  const onChangeSearchQuery = (value: string) => {
    setSearchQuery(value);

    const requiredStore =
      searchCategory === t('mods')
        ? mods
        : searchCategory === t('maps')
        ? maps
        : searchCategory === t('skins')
        ? skins
        : seeds;

    const list = requiredStore.filter(item => {
      return item.tags.split(' ').find(i => {
        return i.toLowerCase().includes(value.toLowerCase());
      });
    });
    setFilteredList(list);
  };

  const isSearchCategory = (item: string) => {
    const fItem =
      item === t('mods')
        ? 'mods'
        : item === t('maps')
        ? 'maps'
        : item === t('skins')
        ? 'skins'
        : 'seeds';
    return searchCategory === fItem;
  };

  const resolveSearchHints = () => {
    const res = hints.find(i => i.type === searchCategory);
    return res ? res : { hints: [''] };
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
              placeholder={t('search')}
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
                {item.toUpperCase()}
              </S.Category>
            </S.CategoryWrap>
          );
        })}
      </S.CategoriesWrap>

      {searchQuery === '' ? (
        <S.HintsWrap>
          {resolveSearchHints().hints.map((item: string) => {
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
