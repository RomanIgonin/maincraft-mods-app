import React, { useCallback, useEffect, useMemo, useState } from 'react';
import * as S from './styles';
import {
  BG_NEW,
  BG_NEW_SKINS,
  BG_SKIN,
  DOWNLOAD_BLUE,
  DOWNLOAD_GRAY,
  SIZE,
  VERSION,
} from '@src/assets/constants/imagePaths';
import screenNames from '@src/modules/navigation/screen-names';
import { FlashList } from '@shopify/flash-list';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { useNavigation } from '@react-navigation/native';
import likeService from '@src/modules/your-like-list/domain/services/LikeService';
import storageService from '@src/modules/core/services/StorageService';
import useModsStore from '@src/modules/mods/store';
import { formatBytes } from '@src/modules/settings/domain/helpers/formatBytes';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';
import useSeedsStore from '@src/modules/seeds/store';
import useTranslationsStore from '@src/modules/translations/store';

interface Props {
  typeCategory: CategoryType;
  data: CategoryItem[];
}

const UDList = (props: Props) => {
  const { typeCategory, data } = props;
  const navigation = useNavigation<any>();
  const { updateMod } = useModsStore();
  const { updateMap } = useMapsStore();
  const { updateSkin } = useSkinsStore();
  const { updateSeed } = useSeedsStore();
  const { currentLanguage } = useTranslationsStore();

  const [likedListIds, setLikedListIds] = useState<string[]>([]);

  const updateCategory = useMemo(() => {
    return typeCategory === 'mods'
      ? updateMod
      : typeCategory === 'maps'
      ? updateMap
      : typeCategory === 'skins'
      ? updateSkin
      : updateSeed;
  }, [typeCategory, updateMap, updateMod, updateSeed, updateSkin]);

  useEffect(() => {
    getData().then();
  }, []);

  const getData = useCallback(async () => {
    await storageService.getData(typeCategory).then(res => {
      if (res) {
        setLikedListIds(res as string[]);
      }
    });
  }, [typeCategory]);

  const isLikePress = likeService.checkIsLikePress;
  const isLikeInList = likeService.checkLikeInListIds;

  const onPressLike = useCallback(
    async (item: CategoryItem) => {
      await likeService.setIdLikedItem(item.id, likedListIds, typeCategory);
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
    [getData, likedListIds, typeCategory, updateCategory],
  );

  const onPressListItem = useCallback(
    (item: CategoryItem) => {
      navigation.navigate(screenNames.udDetailsScreen, {
        categoryId: item.id,
        categoryType: typeCategory,
      });
    },
    [navigation, typeCategory],
  );

  const renderTopSkins = useCallback(
    ({ item, index }: any) => {
      return (
        <S.TopSkinsWrapper index={index}>
          <S.TopSkins>
            <S.SkinsImageWrap
              onPress={() => onPressListItem(item)}
              activeOpacity={1}>
              <S.SkinsBgImage source={BG_SKIN}>
                <S.SkinsImage
                  source={{
                    uri: item.picture.url,
                  }}
                />
              </S.SkinsBgImage>
            </S.SkinsImageWrap>

            <S.SkinsDetailWrap>
              <S.SkinsDownloadWrap>
                <S.SkinsDownloadIcon source={DOWNLOAD_BLUE} />
                <S.SkinsDownloadText fSize={11}>
                  {item.downloads}
                </S.SkinsDownloadText>
              </S.SkinsDownloadWrap>

              <S.SkinsLikeWrap onPress={() => onPressLike(item)}>
                <S.SkinsLikeIcon
                  resizeMode="contain"
                  source={isLikeInList(item.id, likedListIds)}
                />
                <S.SkinsLikeText fSize={11}>{item.likes}</S.SkinsLikeText>
              </S.SkinsLikeWrap>
            </S.SkinsDetailWrap>
          </S.TopSkins>

          {item.isNew && (
            <S.NewSkinsWrap source={BG_NEW_SKINS}>
              <S.NewSkinsText fSize={13} color={'light'}>
                New
              </S.NewSkinsText>
            </S.NewSkinsWrap>
          )}
        </S.TopSkinsWrapper>
      );
    },
    [isLikeInList, likedListIds, onPressLike, onPressListItem],
  );

  const renderDefaultItem = useCallback(
    (item: CategoryItem) => {
      const name =
        currentLanguage && currentLanguage === 'en'
          ? item.name.en
          : item.name.ru;

      return (
        <S.ListItemWrapper>
          <S.ListItem>
            <S.ItemImageWrapper
              onPress={() => onPressListItem(item)}
              activeOpacity={1}>
              <S.ItemImage
                source={{
                  uri: item.picture.url,
                }}
              />
            </S.ItemImageWrapper>

            <S.DetailsWrap>
              <S.DetailsColumnWrap>
                <S.ModsName
                  fSize={17}
                  color={'grayDark'}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  {name}
                </S.ModsName>

                <S.DetailsBottom>
                  {typeCategory !== 'seeds' && (
                    <>
                      <S.SizeIcon source={SIZE} />
                      <S.DetailsBottomText fSize={9}>
                        {formatBytes(item.file.size)}
                      </S.DetailsBottomText>

                      <S.DownloadIcon source={DOWNLOAD_GRAY} />
                      <S.DetailsBottomText fSize={9}>
                        {item.downloads}
                      </S.DetailsBottomText>
                    </>
                  )}

                  <S.VersionsIcon
                    source={VERSION}
                    isSeedsCategory={typeCategory === 'seeds'}
                  />
                  <S.DetailsBottomText fSize={9}>
                    {item.version}
                  </S.DetailsBottomText>
                </S.DetailsBottom>
              </S.DetailsColumnWrap>

              <S.LikeWrap
                onPress={() => onPressLike(item)}
                isLikePress={isLikePress(item.id, likedListIds)}>
                <S.LikeIcon source={isLikeInList(item.id, likedListIds)} />
                <S.LikeText
                  fSize={14}
                  isLikePress={isLikePress(item.id, likedListIds)}>
                  {item.likes}
                </S.LikeText>
              </S.LikeWrap>
            </S.DetailsWrap>
          </S.ListItem>

          {item.isNew && (
            <S.NewWrap source={BG_NEW}>
              <S.NewText fSize={20} color={'light'}>
                New
              </S.NewText>
            </S.NewWrap>
          )}
        </S.ListItemWrapper>
      );
    },
    [
      typeCategory,
      isLikePress,
      likedListIds,
      isLikeInList,
      onPressListItem,
      onPressLike,
    ],
  );

  const keyExtractor = (item: any) => item.id;
  const renderItem = useCallback(
    ({ item, index }: any) => {
      if (typeCategory === 'skins') {
        return renderTopSkins({ item, index });
      } else {
        return renderDefaultItem(item);
      }
    },
    [renderDefaultItem, renderTopSkins, typeCategory],
  );

  return (
    <S.Container>
      {typeCategory === 'skins' ? (
        <S.FlatListWrap>
          <S.FlatList
            key={'two_columns'}
            showsVerticalScrollIndicator={false}
            horizontal={false}
            numColumns={2}
            data={data}
            renderItem={({ item, index }) => renderItem({ item, index })}
            keyExtractor={keyExtractor}
          />
        </S.FlatListWrap>
      ) : (
        <FlashList
          showsVerticalScrollIndicator={false}
          data={data.slice(0)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          estimatedItemSize={218}
          extraData={likedListIds}
        />
      )}
    </S.Container>
  );
};

export default UDList;
