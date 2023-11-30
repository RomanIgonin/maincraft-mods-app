import { useCallback } from 'react';
import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import { CategoryItem } from "@src/modules/core/interfaces/categoryItem";
import { ExistMaps } from "@src/modules/maps/store";

type DownloadProps = {
  url: string;
  filename: string;
};

interface useFileProps {
  setPercentage: (num: number) => void;
}

export default function useFile(props: useFileProps) {
  const { setPercentage } = props;
  const calculateProgress = response => {
    const percentage = Math.floor(
      (response.bytesWritten / response.contentLength) * 100,
    );
    setPercentage(percentage);
  };

  const download = useCallback(async (props: DownloadProps) => {
    const { url, filename } = props;
    const filepath = DocumentDirectoryPath + '/' + filename;
    const fromUrl = url + filename;
    const response = RNFS.downloadFile({
      fromUrl: fromUrl.replace(/ /g, '%20'),
      toFile: filepath,
      progress: calculateProgress,
    });
    const { statusCode } = await response.promise;
    return { statusCode, filepath };
  }, []);

  return { download };
}
