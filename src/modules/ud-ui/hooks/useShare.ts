import Share from 'react-native-share';

export const useShare = (shareMessage: string, shareUrl: string) => {
  const options = {
    message: shareMessage,
    url: shareUrl.replace('', '_'),
  };
  Share.open(options)
    .then(res => {})
    .catch(err => {
      err && console.warn('error in useShare', err);
    });
};
