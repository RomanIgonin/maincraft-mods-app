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
import UDSelectionItemList from '@src/modules/ud-ui/components/ud-selection-item-list';
import UDTopSkinsList from '@src/modules/ud-ui/components/ud-top-skins-list';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { useNavigation } from '@react-navigation/native';
import likeService from '@src/modules/your-like-list/domain/services/LikeService';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import analyticService from '@src/modules/analytics/services/AnayticService';

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
  const { t } = useAppTranslation('main_menu');

  const { updateMod } = useModsStore();
  const { updateMap } = useMapsStore();
  const { updateSkin } = useSkinsStore();
  const { updateSeed } = useSeedsStore();
  const [likedListIds, setLikedListIds] = useState<string[]>([]);
  const navigation = useNavigation<any>();
  const selectionListRef = useRef<any>(null);
  const screenName = useMemo(() => {
    return categoryType === 'maps'
      ? screenNames.maps
      : categoryType === 'skins'
      ? screenNames.skins
      : screenNames.mods;
  }, [categoryType]);

  const updateCategory = useMemo(() => {
    return categoryType === 'mods'
      ? updateMod
      : categoryType === 'maps'
      ? updateMap
      : categoryType === 'skins'
      ? updateSkin
      : updateSeed;
  }, [categoryType, updateMap, updateMod, updateSeed, updateSkin]);

  useEffect(() => {
    getData().then();
  }, [data]);

  const getData = useCallback(async () => {
    await storageService.getData(categoryType).then(res => {
      if (res) {
        setLikedListIds(res as string[]);
      }
    });
  }, [categoryType]);

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
    if (title === t('daily')) {
      analyticService.reportEvent('click_daily_selection');
      navigation.navigate(screenNames.dailySelection);
    } else {
      if (title === t('top_mods')) {
        analyticService.reportEvent('click_top_mods');
      } else if (title === t('christmas')) {
        analyticService.reportEvent('click_event_menu');
      } else if (title === t('top_maps')) {
        analyticService.reportEvent('click_top_maps');
      } else if (title === t('top_skins')) {
        analyticService.reportEvent('click_top_skins');
      }
      navigation.navigate(screenName);
    }
    scrollFlatListToStart();
  };

  const onPressLike = useCallback(
    async (item: CategoryItem) => {
      await likeService.setIdLikedItem(item.id, likedListIds, categoryType);
      const isLiked = likeService.checkIsLikePress(item.id, likedListIds);
      if (isLiked) {
        likeService.deleteLike(item.id).then(res => {
          if (res) {
            updateCategory(res);
          }
        });
      } else {
        likeService.putLike(item.id).then(res => {
          if (res) {
            updateCategory(res);
          }
        });
      }
      await getData();
    },
    [categoryType, getData, likedListIds, updateCategory],
  );

  const keyExtractor = (item: any) => item?.id;
  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <>
          {categoryType === 'skins' ? (
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
    [categoryType, getData, onPressLike, likedListIds, isImageDelayLoading],
  );

  const resolveFlatList = useCallback(() => {
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
          {title === t('daily') && <S.HeaderIcon source={CLOCK} />}
          {title === t('christmas') && <S.HeaderIcon source={CHRISTMAS} />}
        </S.HeaderWithIcon>

        <S.Button onPress={onPressViewAll}>
          <S.ButtonText fSize={12} color={'light'}>
            {t('view_all')}
          </S.ButtonText>
        </S.Button>
      </S.Header>

      <S.FlatListWrap>{resolveFlatList()}</S.FlatListWrap>
    </S.Container>
  );
}
