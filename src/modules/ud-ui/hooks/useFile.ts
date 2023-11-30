import { useCallback } from 'react';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import useSettingsStore from '@src/modules/settings/store';
import useModsStore from '@src/modules/mods/store';
import useMapsStore from '@src/modules/maps/store';
import useSkinsStore from '@src/modules/skins/store';

interface useFileProps {
  setPercentage: (num: number) => void;
}

export default function useFile(props: useFileProps) {
  const { loadCacheSize } = useSettingsStore();
  const { loadExistMods } = useModsStore();
  const { loadExistMaps } = useMapsStore();
  const { loadExistSkins } = useSkinsStore();

  const { setPercentage } = props;
  const calculateProgress = useCallback(
    (response: RNFS.DownloadProgressCallbackResult) => {
      const percentage = Math.floor(
        (response.bytesWritten / response.contentLength) * 100,
      );
      setPercentage(percentage);
    },
    [setPercentage],
  );

  const openFile = async (
    filepath: string,
    setIsErrorModalVisible: (bool: boolean) => void,
  ) => {
    try {
      await FileViewer.open(filepath, {
        showOpenWithDialog: true,
        showAppsSuggestions: false,
      });
    } catch {
      setIsErrorModalVisible(true);
    }
  };

  const download = useCallback(
    async (fileName: string) => {
      const filepath = DocumentDirectoryPath + '/' + fileName;
      const fromUrl = 'http://80.76.32.3:9000/file/' + fileName;
      const response = RNFS.downloadFile({
        fromUrl: fromUrl.replace(/ /g, '%20'),
        toFile: filepath,
        progress: calculateProgress,
      });
      const { statusCode } = await response.promise;
      return { statusCode, filepath };
    },
    [calculateProgress],
  );

  const downloadFile = useCallback(
    async (
      setDownloading: (bool: boolean) => void,
      categoryType: string,
      fileName: string,
      setIsErrorModalVisible: (bool: boolean) => void,
    ): Promise<number | undefined> => {
      try {
        setDownloading(true);
        const { statusCode, filepath } = await download(fileName);
        if (statusCode === 200) {
          loadCacheSize();
          loadExistMods();
          loadExistMaps();
          loadExistSkins();
          await openFile(filepath, setIsErrorModalVisible);
        }
        setDownloading(false);
        return statusCode;
      } catch (error) {
        console.warn('error in downloadFile', error);
      }
    },
    [download, loadCacheSize, loadExistMaps, loadExistMods, loadExistSkins],
  );

  return { downloadFile, openFile };
}
