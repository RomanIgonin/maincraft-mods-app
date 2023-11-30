import React from 'react';
import * as S from './styles';
import UDHeader from '@src/modules/ud-ui/components/ud-header';
import UDList from '@src/modules/ud-ui/components/ud-list';
import useSeedsStore from '@src/modules/seeds/store';
import { navigateBack } from '@src/modules/navigation/RootNavigation';
import { useAppTranslation } from '@src/modules/translations/domain/hooks/use-app-translation';

export default function SeedsScreen() {
  const { seeds } = useSeedsStore();
  const { t } = useAppTranslation('shared');

  return (
    <S.Container>
      <S.HeaderShadow>
        <UDHeader
          title={t('Seeds')}
          arrowBackButton={true}
          onPressArrowBack={() => navigateBack()}
        />
      </S.HeaderShadow>

      <UDList typeCategory={'seeds'} data={seeds} />
    </S.Container>
  );
}
