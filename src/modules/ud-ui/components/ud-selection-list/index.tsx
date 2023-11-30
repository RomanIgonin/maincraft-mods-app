import * as S from './styles';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { CHRISTMAS, CLOCK, SAD } from '@src/assets/constants/imagePaths';
import screenNames from '@src/modules/navigation/screen-names';
import storageService from '@src/modules/core/services/StorageService';
import likeService from '@src/modules/core/services/LikeService';
import UDSelectionItemList from '@src/modules/ud-ui/components/ud-selection-item-list';
import UDTopSkinsList from '@src/modules/ud-ui/components/ud-top-skins-list';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  data: CategoryItem[];
  categoryType: CategoryType;
  isImageDelayLoading?: boolean;
  isDetailsScreen?: boolean;
}

export default function UDSelectionList(props: Props) {
  const {
    title,
    data,
    categoryType,
    isImageDelayLoading,
    isDetailsScreen = false,
  } = props;

  const [likedListIds, setLikedListIds] = useState<CategoryItem[]>([]);
  const navigation = useNavigation<any>();
  const selectionListRef = useRef(null);

  const screenName = useMemo(() => {
    return categoryType === 'maps'
      ? screenNames.maps
      : categoryType === 'skins'
      ? screenNames.skins
      : screenNames.mods;
  }, [categoryType]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await storageService.getData(categoryType).then(res => {
      if (res) setLikedListIds(res);
    });
  };

  const scrollFlatListToStart = () => {
    setTimeout(() => {
      selectionListRef.current?.scrollToIndex({
        animated: true,
        index: 0,
        viewPosition: 0,
      });
    }, 1200);
  };

  const onPressViewAll = () => {
    navigation.navigate(screenName);
    scrollFlatListToStart();
  };

  const onPressLike = async (item: any) => {
    await likeService.setIdLikedItem(item, likedListIds, categoryType);
    getData();
  };

  const keyExtractor = (item: any) => item?.id;
  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <>
          {title === 'Top skins' ? (
            <UDTopSkinsList
              item={item}
              getData={getData}
              onPressLike={onPressLike}
              likedListIds={likedListIds}
              isImageDelayLoading={isImageDelayLoading}
            />
          ) : (
            <UDSelectionItemList
              item={item}
              title={title}
              getData={getData}
              onPressLike={onPressLike}
              likedListIds={likedListIds}
              isImageDelayLoading={isImageDelayLoading}
              categoryType={categoryType}
            />
          )}
        </>
      );
    },
    [likedListIds, title, isImageDelayLoading],
  );

  const resolveFlatlist = useCallback(() => {
    return data.length === 0 && isDetailsScreen ? (
      <S.EmptySimilarWrap>
        <S.EmptySimilarIcon source={SAD} />
        <S.EmptySimilarText fSize={25} color={'grayDark'}>
          No similar
        </S.EmptySimilarText>
      </S.EmptySimilarWrap>
    ) : (
      <S.FlatList
        ref={selectionListRef}
        contentContainerStyle={{ minHeight: 156 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    );
  }, [data, isDetailsScreen, renderItem]);

  return (
    <S.Container>
      <S.Header>
        <S.HeaderWithIcon>
          <S.HeaderText fSize={24} color={'grayDark'}>
            {title}
          </S.HeaderText>
          {title === 'Daily selection' && <S.HeaderIcon source={CLOCK} />}
          {title === 'Christmas' && <S.HeaderIcon source={CHRISTMAS} />}
        </S.HeaderWithIcon>

        <S.Button onPress={onPressViewAll}>
          <S.ButtonText fSize={12} color={'light'}>
            VIEW ALL
          </S.ButtonText>
        </S.Button>
      </S.Header>

      <S.FlatListWrap>{resolveFlatlist()}</S.FlatListWrap>
    </S.Container>
  );
}
