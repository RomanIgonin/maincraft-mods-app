import React from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import UDList from '@src/modules/ud-ui/components/ud-list';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';
import useModsStore from '@src/modules/mods/store';

export default function DailySelectionScreen() {
  const { dailySelectionMods } = useModsStore();
  const { t } = useAppTranslation('main_menu');

  return (
    <S.Container>
      <S.HeaderShadow>
        <UDHeader
          title={t('daily')}
          arrowBackButton={true}
          onPressArrowBack={() => navigateBack()}
        />
      </S.HeaderShadow>

      <UDList typeCategory={'mods'} data={dailySelectionMods} />
    </S.Container>
  );
}
