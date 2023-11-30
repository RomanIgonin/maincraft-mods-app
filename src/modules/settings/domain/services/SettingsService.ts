import RNFS, { DocumentDirectoryPath } from 'react-native-fs';
import { formatBytes } from '@src/modules/settings/domain/helpers/formatBytes';

export class SettingsService {
  public async getCacheSize() {
    const dirItems = await this.getDirItems();
    const size = dirItems.reduce((acc, val) => acc + val.size, 0);
    const cacheSize = formatBytes(size);
    return cacheSize;
  }

  public async clearCache() {
    const dirItems = await this.getDirItems();
    dirItems.map(item => RNFS.unlink(item.path));
  }

  private async getDirItems() {
    const filepath = DocumentDirectoryPath;
    return await RNFS.readDir(filepath);
  }
}

const settingsService = new SettingsService();
export default settingsService;
