import React, { useCallback, useState } from 'react';
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
import Config from 'react-native-config';
import { FlashList } from '@shopify/flash-list';
import likeService from '@src/modules/core/services/LikeService';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { useNavigation } from '@react-navigation/native';

interface Props {
  typeCategory: CategoryType;
  data: CategoryItem[];
}

const UDList = (props: Props) => {
  const { typeCategory, data } = props;

  const navigation = useNavigation<any>();

  const [likedListIds, setLikedListIds] = useState<CategoryItem[]>([]);

  const isLikePress = likeService.checkIsLikePress;
  const isLikeInList = likeService.checkLikeInListIds;

  const screenName =
    typeCategory === 'maps'
      ? screenNames.mapDetailsScreen
      : typeCategory === 'mods'
      ? screenNames.modDetailsScreen
      : typeCategory === 'skins'
      ? screenNames.skinDetailsScreen
      : screenNames.seedDetailsScreen;

  const onPressLike = async (item: any) => {
    await likeService.setIdLikedItem(item, likedListIds, typeCategory);
  };

  const onPressListItem = ({ item }: any) => {
    navigation.navigate(screenName, {
      categoryItem: item,
    });
  };

  const TopSkinsList = useCallback(
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
                    uri: Config.API_URL + 'skins/' + item.imagePath,
                  }}
                />
              </S.SkinsBgImage>
            </S.SkinsImageWrap>

            <S.SkinsDetailWrap>
              <S.SkinsDownloadWrap>
                <S.SkinsDownloadIcon source={DOWNLOAD_BLUE} />
                <S.SkinsDownloadText fSize={11}>105k</S.SkinsDownloadText>
              </S.SkinsDownloadWrap>

              <S.SkinsLikeWrap onPress={() => onPressLike(item)}>
                <S.SkinsLikeIcon source={isLikeInList(item, likedListIds)} />
                <S.SkinsLikeText fSize={11}>1.5k</S.SkinsLikeText>
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
    [likedListIds],
  );

  const ListItem = useCallback(
    ({ item }: any) => {
      return (
        <S.ListItemWrapper>
          <S.ListItem>
            <S.ItemImageWrapper
              onPress={() => onPressListItem({ item })}
              activeOpacity={1}>
              <S.ItemImage
                source={{
                  uri: Config.API_URL + typeCategory + '/' + item.imagePath,
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
                  {item.engName}
                </S.ModsName>

                <S.DetailsBottom>
                  <S.SizeIcon source={SIZE} />
                  <S.DetailsBottomText fSize={9}>
                    {item.size}
                  </S.DetailsBottomText>

                  <S.DownloadIcon source={DOWNLOAD_GRAY} />
                  <S.DetailsBottomText fSize={9}>105k</S.DetailsBottomText>

                  <S.VersionsIcon source={VERSION} />
                  <S.DetailsBottomText fSize={9}>
                    {item.version}
                  </S.DetailsBottomText>
                </S.DetailsBottom>
              </S.DetailsColumnWrap>

              <S.LikeWrap
                onPress={() => onPressLike(item)}
                isLikePress={isLikePress(item, likedListIds)}>
                <S.LikeIcon source={isLikeInList(item, likedListIds)} />
                <S.LikeText
                  fSize={14}
                  isLikePress={isLikePress(item, likedListIds)}>
                  1.5k
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
    [typeCategory, likedListIds],
  );

  const keyExtractor = (item: any) => item.id;
  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <>
          {typeCategory === 'skins' ? (
            <TopSkinsList item={item} index={index} />
          ) : (
            <ListItem item={item} />
          )}
        </>
      );
    },
    [typeCategory],
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
          data={data}
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
