import { create } from 'zustand';
import notificationService from '@src/modules/notifications/domain/services/NotificationService';
import notificationsService from '@src/modules/notifications/domain/services/NotificationService';

type State = {
  isGranted: boolean;
  isEnabledInSettings: boolean;
  checkNotification: () => void;
};

const useNotificationsStore = create<State>(set => ({
  isGranted: false,
  isEnabledInSettings: false,

  checkNotification: async () => {
    try {
      const isEnabled = await notificationService.getNotificationPermission();
      const savedToken = await notificationsService.getSavedToken();

      if (isEnabled) {
        set({ isEnabledInSettings: true });

        if (savedToken) {
          await notificationService.refreshToken();
          set({ isGranted: true });
        } else {
          set({ isGranted: false });
        }
      } else {
        await notificationService.removeSavedToken();
        set({ isEnabledInSettings: false });
        set({ isGranted: false });
      }
    } catch (err) {
      console.warn('Error in loadNotificationPermission', err);
    }
  },
}));

export default useNotificationsStore;
