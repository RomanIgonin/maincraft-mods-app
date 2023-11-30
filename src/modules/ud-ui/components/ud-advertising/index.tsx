import React from 'react';
import * as S from './styles';
import Config from 'react-native-config';
import { BG_NEW } from '@src/assets/constants/imagePaths';

export default function UDAdvertising() {
  const imageUri = Config.API_URL + 'maps/img/halloweens-adventure-4.jpg';

  const onPressDownload = () => {};

  return (
    <S.Container>
      <S.ListItem>
        <S.ItemImage
          source={{
            uri: imageUri,
          }}
        />

        <S.DetailsWrap>
          <S.ModsNameWrap>
            <S.ModsName fSize={17} color={'grayDark'}>
              Advertising other app
            </S.ModsName>
          </S.ModsNameWrap>

          <S.DownloadWrap onPress={onPressDownload}>
            <S.DownloadText fSize={12} color={'light'}>
              DOWNLOAD
            </S.DownloadText>
          </S.DownloadWrap>
        </S.DetailsWrap>
      </S.ListItem>

      <S.ADWrap source={BG_NEW}>
        <S.ADText fSize={20} color={'light'}>
          AD
        </S.ADText>
      </S.ADWrap>
    </S.Container>
  );
}
