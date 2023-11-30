import * as S from './styles';
import {
  BG_NEW,
  DOWNLOAD_GRAY,
  SIZE,
  VERSION,
} from '@src/assets/constants/imagePaths';
import React, { useCallback, useState } from 'react';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import screenNames from '@src/modules/navigation/screen-names';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { useNavigation } from '@react-navigation/native';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';
import likeService from '@src/modules/your-like-list/domain/services/LikeService';
import { formatBytes } from '@src/modules/settings/domain/helpers/formatBytes';
import useTranslationsStore from '@src/modules/translations/store';

interface Props {
  item: CategoryItem;
  getData: () => void;
  onPressLike: (item: any) => void;
  likedListIds: string[];
  isImageDelayLoading?: boolean;
  categoryType: CategoryType;
}

export default function UDSelectionItemList(props: Props) {
  const { item, onPressLike, likedListIds, isImageDelayLoading, categoryType } =
    props;

  const [numLikes, setNumLikes] = useState(item.likes);

  const { isModsLoading } = useModsStore();
  const { isMapsLoading } = useMapsStore();
  const { currentLanguage } = useTranslationsStore();

  const name =
    currentLanguage && currentLanguage === 'en' ? item.name.en : item.name.ru;

  const navigation = useNavigation<any>();

  const urlImage = item?.picture.url;
  const isLoadingCategoryType =
    categoryType === 'maps' ? isMapsLoading : isModsLoading;

  const isLikePress = likeService.checkIsLikePress;
  const isLikeInList = likeService.checkLikeInListIds;

  const onLikePressed = useCallback(
    item => {
      if (isLikePress(item.id, likedListIds)) {
        setNumLikes(prevState => prevState - 1);
      } else {
        setNumLikes(prevState => prevState + 1);
      }
      onPressLike(item);
    },
    [isLikePress, likedListIds, onPressLike],
  );

  const onPressListItem = useCallback(() => {
    if (item) {
      navigation.navigate(screenNames.udDetailsScreen, {
        categoryId: item.id,
        categoryType: categoryType,
      });
    }
  }, [categoryType, item, navigation]);

  if (item) {
    return (
      <S.SkeletonItemWrap
        isLoading={isImageDelayLoading || isLoadingCategoryType}
        layout={[
          {
            key: 'someId',
            width: 238,
            height: 144,
            borderRadius: 10,
            marginHorizontal: 6,
            marginBottom: 12,
          },
        ]}>
        <S.ListItemWrap>
          <S.ListItem>
            <S.ImageWrapper onPress={onPressListItem} activeOpacity={1}>
              <S.ItemImage source={{ uri: urlImage }} />
            </S.ImageWrapper>

            <S.DetailsWrap>
              <S.DetailsColumnWrap>
                <S.ModsName
                  fSize={11}
                  color={'grayDark'}
                  ellipsizeMode={'tail'}
                  numberOfLines={1}>
                  {name}
                </S.ModsName>

                <S.DetailsBottom>
                  <S.SizeIcon source={SIZE} />
                  <S.DetailsBottomText fSize={7}>
                    {formatBytes(item.file.size)}
                  </S.DetailsBottomText>

                  <S.DownloadIcon source={DOWNLOAD_GRAY} />
                  <S.DetailsBottomText fSize={7}>
                    {item.downloads}
                  </S.DetailsBottomText>

                  <S.VersionsIcon source={VERSION} />
                  <S.DetailsBottomText fSize={7}>
                    {item.version}
                  </S.DetailsBottomText>
                </S.DetailsBottom>
              </S.DetailsColumnWrap>

              <S.LikeWrap
                onPress={() => onLikePressed(item)}
                isLikePress={isLikePress(item.id, likedListIds)}>
                <S.LikeIcon
                  resizeMode="contain"
                  source={isLikeInList(item.id, likedListIds)}
                />
                <S.LikeText
                  fSize={8}
                  isLikePress={isLikePress(item.id, likedListIds)}>
                  {numLikes}
                </S.LikeText>
              </S.LikeWrap>
            </S.DetailsWrap>
          </S.ListItem>

          {item.isNew && (
            <S.NewWrap source={BG_NEW}>
              <S.NewText fSize={14} color={'light'}>
                New
              </S.NewText>
            </S.NewWrap>
          )}
        </S.ListItemWrap>
      </S.SkeletonItemWrap>
    );
  } else {
    return <></>;
  }
}
