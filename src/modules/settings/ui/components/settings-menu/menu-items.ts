import { SettingsMenuItem } from '@src/modules/settings/ui/components/settings-menu/SettingsMenuItem';
import {
  ADVERTISING,
  DATA_CLEANING,
  INFO,
  MAIL,
  RECTANGLE,
  RESTORE,
  SHARE_GRAY,
  STAR,
  WORLD,
} from '@src/assets/constants/imagePaths';

export const SettingsMenuItems: SettingsMenuItem[] = [
  { id: '1', icon: MAIL, label: 'Contact us' },
  { id: '2', icon: DATA_CLEANING, label: 'Clear cache' },
  { id: '3', icon: WORLD, label: 'Language' },
  { id: '4', icon: SHARE_GRAY, label: 'Share' },
  { id: '5', icon: ADVERTISING, label: 'Remove ads' },
  { id: '6', icon: RECTANGLE, label: 'Notification' },
  { id: '7', icon: STAR, label: 'Rate the app' },
  { id: '8', icon: RESTORE, label: 'Restore purchases' },
  { id: '9', icon: INFO, label: 'About app' },
];
