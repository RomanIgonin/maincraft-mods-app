import * as S from './styles';
import Config from 'react-native-config';
import {
  BG_NEW_SKINS,
  BG_SKIN,
  DOWNLOAD_BLUE,
  LIKE_GRAY,
  LIKE_RED,
} from '@src/assets/constants/imagePaths';
import React from 'react';
import useSkinsStore from '@src/modules/skins/store';
import screenNames from '@src/modules/navigation/screen-names';
import likeService from '@src/modules/core/services/LikeService';
import { CategoryItem } from '@src/modules/core/interfaces/categoryItem';
import { useNavigation } from '@react-navigation/native';

interface Props {
  item: any;
  getData: () => void;
  onPressLike: (item: any) => void;
  likedListIds: CategoryItem[];
  isImageDelayLoading?: boolean;
}

export default function UDTopSkinsList(props: Props) {
  const { item, onPressLike, likedListIds, isImageDelayLoading } = props;

  const { isSkinsLoading } = useSkinsStore();

  const navigation = useNavigation<any>();

  const urlImage = Config.API_URL + 'skins/' + item.imagePath;

  const isLikePress = likeService.checkIsLikePress;

  const onPressListItem = () => {
    navigation.navigate(screenNames.skins);
  };

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
            <S.SkinsDownloadText fSize={11}>105k</S.SkinsDownloadText>
          </S.SkinsDownloadWrap>

          <S.SkinsLikeWrap onPress={() => onPressLike(item)}>
            <S.SkinsLikeIcon
              source={isLikePress(item, likedListIds) ? LIKE_RED : LIKE_GRAY}
            />
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
    </S.SkeletonTopSkinsWrap>
  );
}
