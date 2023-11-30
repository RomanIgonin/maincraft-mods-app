import React from 'react';
import * as S from './styles';
import screenNames from '@src/modules/navigation/screen-names';
import { useNavigation } from '@react-navigation/native';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import {
  DISCORD_BTN,
  PREMIUM_BTN,
  YOUR_LIKE_LIST_BTN,
  YOUTUBE_BTN,
} from '@src/assets/constants/imagePaths';
import SettingsMenu from '@src/modules/settings/ui/components/settings-menu';
import { Alert, Linking, ScrollView } from 'react-native';

type ButtonType = 'Discord' | 'Youtube';

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  const onPressPremium = () => {
    navigation.navigate(screenNames.premium);
  };

  const onPressDiscordYoutube = async (buttonType: ButtonType) => {
    const url =
      buttonType === 'Discord'
        ? 'https://discord.com/'
        : 'https://www.youtube.com/';
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const onPressYourLikeList = () => {
    navigation.navigate(screenNames.yourLikeList);
  };

  return (
    <S.Container>
      <S.HeaderShadow>
        <UDHeader title={'Settings'} />
      </S.HeaderShadow>

      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <S.Wrap>
          <S.PremiumButtonWrap onPress={onPressPremium}>
            <S.PremiumButton source={PREMIUM_BTN} resizeMode={'stretch'} />
          </S.PremiumButtonWrap>

          <S.ButtonsWrap>
            <S.DiscordYoutubeWrap>
              <S.DiscordWrap onPress={() => onPressDiscordYoutube('Discord')}>
                <S.DiscordButton source={DISCORD_BTN} resizeMode={'stretch'} />
              </S.DiscordWrap>

              <S.YoutubeWrap onPress={() => onPressDiscordYoutube('Youtube')}>
                <S.YoutubeButton source={YOUTUBE_BTN} resizeMode={'stretch'} />
              </S.YoutubeWrap>
            </S.DiscordYoutubeWrap>

            <S.YourLikeListWrap onPress={onPressYourLikeList}>
              <S.YourLikeListButton
                source={YOUR_LIKE_LIST_BTN}
                resizeMode={'stretch'}
              />
            </S.YourLikeListWrap>
          </S.ButtonsWrap>
        </S.Wrap>

        <SettingsMenu />
      </ScrollView>
    </S.Container>
  );
}
