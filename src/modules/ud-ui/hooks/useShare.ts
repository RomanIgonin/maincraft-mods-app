import Share from 'react-native-share';
import dynamicLinks from '@react-native-firebase/dynamic-links';

export const useShare = () => {
  const appUrl = 'https://maincraftmodsapp.page.link';

  const share = async (engName: string, urlShare: string) => {
    const url = await dynamicLinks().buildShortLink({
      domainUriPrefix: appUrl,
      link: urlShare,
    });
    const options = {
      message: engName,
      url,
    };
    await Share.open(options);
  };

  return { share };
};
