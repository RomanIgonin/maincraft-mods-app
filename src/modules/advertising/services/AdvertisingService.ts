import {
  InterstitialEvents,
  IronSource,
  RewardedVideoEvents,
} from 'ironsource-mediation';
import { getTrackingStatus } from 'react-native-tracking-transparency';
import Clipboard from '@react-native-clipboard/clipboard';
import storageService from '@src/modules/core/services/StorageService';
import mobileAds from 'react-native-google-mobile-ads';

export class AdvertisingService {
  public async init() {
    const isTestMode = await this.getTestMode();
    try {
      await mobileAds().initialize();

      // Both method should be set before initializing the SDK.
      await IronSource.setMetaData('do_not_sell', ['true']);
      await IronSource.setMetaData('is_child_directed', ['false']);

      await IronSource.init('1abbf517d', [
        'REWARDED_VIDEO',
        'INTERSTITIAL',
        'BANNER',
      ]);

      await this.setProvidedConsent();
      await IronSource.setAdaptersDebug(true);
      if (!isTestMode) {
        await IronSource.loadInterstitial();
      }
    } catch (error) {
      console.warn('error in AdvertisingService.init()', error);
    }
  }

  private async setProvidedConsent() {
    const trackingStatus = await getTrackingStatus();
    const status =
      trackingStatus === 'authorized' || trackingStatus === 'unavailable';
    await IronSource.setConsent(status);
  }

  public async showRewardedVideo(
    download: () => void,
    isSeedsCategory: boolean,
    seedKey: string,
  ) {
    //todo реклама отключена на время модерации
    // const isTestMode = await this.getTestMode();
    try {
      const downloadOrCopy = async () => {
        if (isSeedsCategory) {
          Clipboard.setString(seedKey);
        } else {
          await download();
        }
      };

      await downloadOrCopy();

      // if (isTestMode) {
      //   await downloadOrCopy();
      // }
      // RewardedVideoEvents.onRewardedVideoAdClosed.setListener(async () => {
      //   await downloadOrCopy();
      // });
      //
      // await IronSource.shouldTrackNetworkState(true);
      //
      // const isAvailable: boolean = await IronSource.isRewardedVideoAvailable();
      // if (isAvailable && !isTestMode) {
      //   await IronSource.showRewardedVideo();
      // }
    } catch (error) {
      console.warn('error in AdvertisingService.showRewardedVideo()', error);
    }
  }

  public async showInterstitial() {
    const isTestMode = await this.getTestMode();

    await InterstitialEvents.onInterstitialAdClosed.setListener(async () => {
      await IronSource.loadInterstitial();
    });

    const isReady = await IronSource.isInterstitialReady();
    if (isReady && !isTestMode) {
      await IronSource.showInterstitial();
    }
  }

  private async getTestMode() {
    return await storageService.getData('TEST_MODE');
  }
}

const advertisingService = new AdvertisingService();
export default advertisingService;
