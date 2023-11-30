import * as S from './styles';
import Config from 'react-native-config';
import {
  BG_NEW,
  DOWNLOAD_GRAY,
  SIZE,
  VERSION,
} from '@src/assets/constants/imagePaths';
import React from 'react';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import screenNames from '@src/modules/navigation/screen-names';
import likeService from '@src/modules/core/services/LikeService';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { useNavigation } from '@react-navigation/native';
import { CategoryType } from '@src/modules/core/interfaces/categoryType';

interface Props {
  item: any;
  title: string;
  getData: () => void;
  onPressLike: (item: any) => void;
  likedListIds: CategoryItem[];
  isImageDelayLoading?: boolean;
  categoryType: CategoryType;
}

export default function UDSelectionItemList(props: Props) {
  const {
    item,
    title,
    onPressLike,
    likedListIds,
    isImageDelayLoading,
    categoryType,
  } = props;

  const { isModsLoading } = useModsStore();
  const { isMapsLoading } = useMapsStore();

  const navigation = useNavigation<any>();

  const urlImage = Config.API_URL + categoryType + '/' + item.imagePath;
  const isLoadingCategoryType =
    categoryType === 'maps' ? isMapsLoading : isModsLoading;
  const screenName =
    categoryType === 'maps'
      ? screenNames.mapDetailsScreen
      : screenNames.modDetailsScreen;

  const isLikePress = likeService.checkIsLikePress;
  const isLikeInList = likeService.checkLikeInListIds;

  const onPressListItem = ({ item }: any) => {
    if (title === 'Similar') navigateBack();
    navigation.navigate(screenName, {
      categoryItem: item,
    });
  };

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
          <S.ImageWrapper
            onPress={() => onPressListItem({ item })}
            activeOpacity={1}>
            <S.ItemImage source={{ uri: urlImage }} />
          </S.ImageWrapper>

          <S.DetailsWrap>
            <S.DetailsColumnWrap>
              <S.ModsName
                fSize={11}
                color={'grayDark'}
                ellipsizeMode={'tail'}
                numberOfLines={1}>
                {item.engName}
              </S.ModsName>

              <S.DetailsBottom>
                <S.SizeIcon source={SIZE} />
                <S.DetailsBottomText fSize={7}>{item.size}</S.DetailsBottomText>

                <S.DownloadIcon source={DOWNLOAD_GRAY} />
                <S.DetailsBottomText fSize={7}>105k</S.DetailsBottomText>

                <S.VersionsIcon source={VERSION} />
                <S.DetailsBottomText fSize={7}>
                  {item.version}
                </S.DetailsBottomText>
              </S.DetailsBottom>
            </S.DetailsColumnWrap>

            <S.LikeWrap
              onPress={() => onPressLike(item)}
              isLikePress={isLikePress(item, likedListIds)}>
              <S.LikeIcon source={isLikeInList(item, likedListIds)} />
              <S.LikeText
                fSize={8}
                isLikePress={isLikePress(item, likedListIds)}>
                1.5k
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
}
