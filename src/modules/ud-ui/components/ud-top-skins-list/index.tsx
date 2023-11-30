import * as S from './styles';
import {
  BG_NEW_SKINS,
  BG_SKIN,
  DOWNLOAD_BLUE,
  LIKE_GRAY,
  LIKE_RED,
} from '@src/assets/constants/imagePaths';
import React, { useCallback } from 'react';
import useSkinsStore from '@src/modules/skins/store';
import screenNames from '@src/modules/navigation/screen-names';
import { useNavigation } from '@react-navigation/native';
import likeService from '@src/modules/your-like-list/domain/services/LikeService';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';

interface Props {
  item: CategoryItem;
  getData: () => void;
  onPressLike: (item: any) => void;
  likedListIds: string[];
  isImageDelayLoading?: boolean;
}

export default function UDTopSkinsList(props: Props) {
  const { item, onPressLike, likedListIds, isImageDelayLoading } = props;

  const { isSkinsLoading } = useSkinsStore();

  const navigation = useNavigation<any>();

  const urlImage = item.picture.url;

  const isLikePress = likeService.checkIsLikePress;

  const onPressListItem = useCallback(() => {
    if (item) {
      navigateBack();
      navigation.navigate(screenNames.udDetailsScreen, {
        categoryId: item.id,
        categoryType: 'skins',
      });
    }
  }, [item, navigation]);

  return (
    <S.SkeletonTopSkinsWrap
      isLoading={isImageDelayLoading || isSkinsLoading}
      layout={[
        {
          key: 'someId',
          width: 170,
          height: 234,
          borderRadius: 20,
          marginHorizontal: 6,
          marginBottom: 12,
        },
      ]}>
      <S.TopSkins>
        <S.ListItemWrapper onPress={onPressListItem} activeOpacity={1}>
          <S.SkinsBgImage source={BG_SKIN}>
            <S.SkinsImage
              source={{
                uri: urlImage,
              }}
            />
          </S.SkinsBgImage>
        </S.ListItemWrapper>

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
              source={isLikePress(item.id, likedListIds) ? LIKE_RED : LIKE_GRAY}
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
    </S.SkeletonTopSkinsWrap>
  );
}
