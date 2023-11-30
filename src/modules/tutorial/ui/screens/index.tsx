import React from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { Alert, Linking } from 'react-native';
import { TutorialItems } from '@src/modules/tutorial/ui/screens/tutorial-items';

export default function TutorialScreen() {
  const onPressItem = async ({ item }) => {
    const supported = await Linking.canOpenURL(item.videoUrl);
    if (supported) {
      await Linking.openURL(item.videoUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${item.videoUrl}`);
    }
  };

  const keyExtractor = item => item.id;
  const renderItem = ({ item }) => {
    return (
      <S.ItemWrap isLastItem={item.title === 'How to install the seeds'}>
        <S.BgImage source={item.imageBg}>
          <S.TitleText fSize={26} color={'light'}>
            {item.title}
          </S.TitleText>
        </S.BgImage>

        <S.ButtonWrap onPress={() => onPressItem({ item })}>
          <S.ButtonText color={'light'} fSize={18}>
            Watch tutorial
          </S.ButtonText>
        </S.ButtonWrap>
      </S.ItemWrap>
    );
  };

  return (
    <S.Container>
      <S.HeaderShadow>
        <UDHeader title={'Tutorial'} discordButton={true} />
      </S.HeaderShadow>

      <S.FlatList
        data={TutorialItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </S.Container>
  );
}
