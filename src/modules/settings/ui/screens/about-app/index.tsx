import React, { useState } from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import { LOGO } from '@src/assets/constants/imagePaths';
import { Alert, Linking } from 'react-native';
import { AboutMenuItems } from '@src/modules/settings/ui/screens/about-app/about-menu-items';
import Modal from 'react-native-modal';

export default function AboutAppScreen() {
  const [openDisclaimer, setOpenDisclaimer] = useState<boolean>(false);

  const onPressArrowBack = () => {
    navigateBack();
  };

  const openLink = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const onPressMail = async () => {
    const mail = 'mailto:service.hedginel@gmail.com';
    await openLink(mail);
  };

  const onPressDisclaimerLink = async () => {
    const url = 'http://account.mojang.com/documents/brand_guidelines';
    await openLink(url);
  };

  const onPressItem = async ({ item }) => {
    if (item.label === 'Disclaimer') {
      setOpenDisclaimer(true);
    } else {
      const url =
        item.label === 'Privacy policy'
          ? 'https://discord.com/'
          : 'https://www.youtube.com/';
      await openLink(url);
    }
  };

  const keyExtractor = item => item.id;
  const renderItem = ({ item }) => {
    return (
      <S.ItemWrap isLastItem={item.label === 'Disclaimer'}>
        <S.TouchableItemWrap onPress={() => onPressItem({ item })}>
          <S.MenuLabel fStyle={'caption400'}>{item.label} </S.MenuLabel>
        </S.TouchableItemWrap>
      </S.ItemWrap>
    );
  };

  return (
    <S.Container showsVerticalScrollIndicator={false} bounces={false}>
      <S.HeaderShadow>
        <UDHeader
          title={'About App'}
          arrowBackButton={true}
          onPressArrowBack={onPressArrowBack}
        />
      </S.HeaderShadow>

      <S.Logo source={LOGO} />

      <S.Label fStyle={'caption700'} fSize={27}>
        AddMods mods for Minecraft PE
      </S.Label>

      <S.WithTheHelpText fStyle={'caption400'} fSize={17}>
        With the help of AddMods collection of add-ons for the game Minecraft PE
        you will be able to add amazing mods, maps and skins to the game!
      </S.WithTheHelpText>

      <S.WithTheHelpText fStyle={'caption400'} fSize={17}>
        Having problems with the app? Write us an e-mail with description of the
        problem and we will reply to you shortly.{' '}
        <S.MailText
          fStyle={'caption700'}
          fSize={17}
          color={'blue'}
          onPress={onPressMail}>
          service.hedginel@gmail.com
        </S.MailText>
      </S.WithTheHelpText>

      <S.FlatList
        data={AboutMenuItems}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
      />

      <S.VersionApp fStyle={'caption400'} fSize={14}>
        Version app 1.0.0
      </S.VersionApp>

      <Modal
        isVisible={openDisclaimer}
        backdropOpacity={0.3}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        style={{ margin: 36 }}
        onRequestClose={() => setOpenDisclaimer(false)}>
        <S.ModalContainer>
          <S.ModalHeader fSize={27} fStyle={'caption700'}>
            Disclaimer
          </S.ModalHeader>

          <S.DisclaimerText fStyle={'caption400'} fSize={18}>
            THIS IS NOT AN OFFICIAL MINECRAFT PRODUCT. NOT APPROVED BY OR
            ASSOCIATED WITH MOJANG AB. Minecraft Name, Minecraft Mark and
            Minecraft Assets are all property of Mojang AB or their respectful
            owner.{'\n'}
            <S.MailText
              fStyle={'caption700'}
              fSize={17}
              color={'blue'}
              onPress={onPressDisclaimerLink}>
              http://account.mojang.com/documents/brand_guidelines
            </S.MailText>
          </S.DisclaimerText>

          <S.ButtonOkWrap>
            <S.ButtonWrap onPress={() => setOpenDisclaimer(false)}>
              <S.ButtonOk color={'green'} fStyle={'caption700'}>
                OK
              </S.ButtonOk>
            </S.ButtonWrap>
          </S.ButtonOkWrap>
        </S.ModalContainer>
      </Modal>
    </S.Container>
  );
}
