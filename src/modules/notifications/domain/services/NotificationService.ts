import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
import storageService from '@src/modules/core/services/StorageService';

class NotificationsService {
  public readonly FCM_KEY = 'FCM_TOKEN';
  public async refreshToken() {
    const savedToken = await this.getSavedToken();
    const token = await this.getNewToken();
    if (token && token !== savedToken) {
      await storageService.setData(this.FCM_KEY, token);
    }
  }

  private async getNewToken() {
    try {
      return await messaging().getToken();
    } catch (error) {
      console.warn('error getNewToken', error);
    }
  }

  public async getSavedToken() {
    return await storageService.getData(this.FCM_KEY);
  }

  public async removeSavedToken() {
    try {
      await messaging().deleteToken();
      await storageService.setData(this.FCM_KEY, '');
    } catch (error) {
      console.warn('error getNewToken', error);
    }
  }

  public async requestNotificationsPermissions(): Promise<boolean> {
    if (Platform.OS === 'ios') {
      const authStatus = await messaging().requestPermission();
      return (
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL
      );
    } else {
      const authStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return authStatus === 'granted';
    }
  }

  public async getNotificationPermission(): Promise<boolean> {
    const status = await messaging().hasPermission();
    return (
      status === messaging.AuthorizationStatus.AUTHORIZED ||
      status === messaging.AuthorizationStatus.PROVISIONAL
    );
  }
}

const notificationsService = new NotificationsService();
export default notificationsService;
