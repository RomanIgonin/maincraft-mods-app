import React, { useMemo } from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { Alert, Linking } from 'react-native';
import { TutorialItem } from '@src/modules/tutorial/domain/interfaces/TutorialItem';
import {
  BG_TUTOR_MAPS,
  BG_TUTOR_MODS,
  BG_TUTOR_SEEDS,
  BG_TUTOR_SKINS,
} from '@src/assets/constants/imagePaths';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import analyticService from '@src/modules/analytics/services/AnayticService';
import { useNavigation } from '@react-navigation/native';

export default function TutorialScreen() {
  const navigation = useNavigation();
  const { t } = useAppTranslation(['tutorial', 'shared']);

  const onPressItem = async ({ item }) => {
    const supported = await Linking.canOpenURL(item.videoUrl);
    if (supported) {
      await Linking.openURL(item.videoUrl);
    } else {
      Alert.alert(`Don't know how to open this URL: ${item.videoUrl}`);
    }
    if (item.title === t('mods')) {
      analyticService.reportEvent('click_tutorial_mods');
    }
    if (item.title === t('maps')) {
      analyticService.reportEvent('click_tutorial_maps');
    }
    if (item.title === t('skins')) {
      analyticService.reportEvent('click_tutorial_skins');
    }
    if (item.title === t('seeds')) {
      analyticService.reportEvent('click_tutorial_seeds');
    }
  };

  const TutorialItems: TutorialItem[] = useMemo(
    () => [
      {
        id: '1',
        imageBg: BG_TUTOR_MODS,
        title: t('mods'),
        videoUrl: 'https://www.youtube.com/',
      },
      {
        id: '2',
        imageBg: BG_TUTOR_MAPS,
        title: t('maps'),
        videoUrl: 'https://www.youtube.com/',
      },
      {
        id: '3',
        imageBg: BG_TUTOR_SKINS,
        title: t('skins'),
        videoUrl: 'https://www.youtube.com/',
      },
      {
        id: '4',
        imageBg: BG_TUTOR_SEEDS,
        title: t('seeds'),
        videoUrl: 'https://www.youtube.com/',
      },
    ],
    [t],
  );

  const keyExtractor = item => item.id;
  const renderItem = ({ item }) => {
    return (
      <S.ShadowItemWrap>
        <S.ItemWrap isLastItem={item.title === 'How to install the seeds'}>
          <S.BgImage source={item.imageBg}>
            <S.TitleText fSize={26} color={'light'}>
              {item.title}
            </S.TitleText>
          </S.BgImage>

          <S.ButtonWrap onPress={() => onPressItem({ item })}>
            <S.ButtonTextWrap>
              <S.ButtonText color={'light'} fSize={18}>
                {t('watch')}
              </S.ButtonText>
            </S.ButtonTextWrap>
          </S.ButtonWrap>
        </S.ItemWrap>
      </S.ShadowItemWrap>
    );
  };

  return (
    <S.Container>
      <S.HeaderShadow>
        <UDHeader title={t('tutorial')} discordButton={true} />
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
