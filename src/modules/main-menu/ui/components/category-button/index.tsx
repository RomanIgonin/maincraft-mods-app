import * as S from '@src/modules/main-menu/ui/components/category-button/styles';
import React from 'react';
import { MAPS, MODS, SEEDS, SKINS } from '@src/assets/constants/imagePaths';
import { Source } from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/native';

interface Props {
  image: Source;
  label: string;
}

export default function CategoryButtons() {
  const CategoryButton = (props: Props) => {
    const { image, label } = props;
    const navigation = useNavigation<any>();

    const onPressCategory = () => {
      navigation.navigate(label);
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
        <CategoryButton image={MAPS} label={'Maps'} />
        <CategoryButton image={MODS} label={'Mods'} />
      </S.CategoryTop>
      <S.CategoryBottom>
        <CategoryButton image={SKINS} label={'Skins'} />
        <CategoryButton image={SEEDS} label={'Seeds'} />
      </S.CategoryBottom>
    </S.CategoryWrap>
  );
}
