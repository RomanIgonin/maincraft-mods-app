import * as S from '@src/modules/main-menu/ui/components/category-button/styles';
import React from 'react';
import { MAPS, MODS, SEEDS, SKINS } from '@src/assets/constants/imagePaths';
import { Source } from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';
// import advertisingService from '@src/modules/advertising/services/AdvertisingService';
import useAdvertisingStore from '@src/modules/advertising/store';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import analyticService from '@src/modules/analytics/services/AnayticService';

interface Props {
  image: Source;
  label: string;
  screenName: string;
}

export default function CategoryButtons() {
  const { t } = useAppTranslation('shared');
  const CategoryButton = (props: Props) => {
    const { image, label, screenName } = props;

    const { showAdCategoryBtn, setShowAdCategoryBtn } = useAdvertisingStore();

    const navigation = useNavigation<any>();

    const onPressCategory = async () => {
      if (showAdCategoryBtn) {
        // TODO: На время сдачи релиза пока скроем показ рекламного ролика
        // await advertisingService.showInterstitial();
      }
      if (screenName === 'Maps') {
        analyticService.reportEvent('start_maps_list');
      }
      if (screenName === 'Mods') {
        analyticService.reportEvent('start_mods_list');
      }
      if (screenName === 'Skins') {
        analyticService.reportEvent('start_skins_list');
      }
      if (screenName === 'Seeds') {
        analyticService.reportEvent('start_seed_list');
      }
      setShowAdCategoryBtn(!showAdCategoryBtn);
      navigation.navigate(screenName);
    };

    return (
      <S.Container label={label} onPress={onPressCategory}>
        <S.ImageBg source={image}>
          <S.Label fSize={24} color={'light'}>
            {label}
          </S.Label>
        </S.ImageBg>
      </S.Container>
    );
  };

  return (
    <S.CategoryWrap>
      <S.CategoryTop>
        <CategoryButton image={MAPS} screenName="Maps" label={t('Maps')} />
        <CategoryButton image={MODS} screenName="Mods" label={t('Mods')} />
      </S.CategoryTop>
      <S.CategoryBottom>
        <CategoryButton image={SKINS} screenName="Skins" label={t('Skins')} />
        <CategoryButton image={SEEDS} screenName="Seeds" label={t('Seeds')} />
      </S.CategoryBottom>
    </S.CategoryWrap>
  );
}
