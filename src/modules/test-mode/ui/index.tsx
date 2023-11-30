import React, { useEffect } from 'react';
import storageService from '@src/modules/core/services/StorageService';
import useTestModeStore from '@src/modules/test-mode/store';
import * as S from './styles';

export const TestMode = () => {
  const { isTestMode, setTestMode } = useTestModeStore();

  useEffect(() => {
    (async () => {
      const isTestModeStorage = await storageService.getData('TEST_MODE');
      if (typeof isTestModeStorage === 'boolean') {
        setTestMode(isTestModeStorage);
      }
    })();
  }, []);

  if (isTestMode) {
    return <S.TestMode>TEST</S.TestMode>;
  } else {
    return <></>;
  }
};
