export const formatBytes = (bytes: number) => {
  if (bytes === 0) {
    return '0 b';
  } else {
    const k = 1024;
    const sizes = ['b', 'kb', 'mb', 'gb', 'tb'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const cacheSize =
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    return cacheSize;
  }
};
