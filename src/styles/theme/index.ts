import { Theme } from '@emotion/react';
import { Platform } from 'react-native';

export const theme: Theme = {
  colors: {
    dark: '#000000',
    light: '#FFFFFF',
    backgroundLight: '#F2F2F2',
    grayLight: '#C2C2C2',
    gray: '#535353',
    grayDark: '#4D4D4D',
    pinkLight: '#FFD0D0',
    redLight: '#FF6767',
    red: '#FF5252',
    green: '#6AAA63',
    blue: '#4287EF',
  },
  fonts: {
    pixel: Platform.select({
      ios: 'progresspixel-bold',
      android: 'Progresspixel_Bold',
    }),
    caption400: Platform.select({
      ios: 'PT Sans Caption',
      android: 'PTSansCaption-Regular',
    }),
    caption700: Platform.select({
      ios: 'PT Sans Caption',
      android: 'PTSansCaption-Bold',
    }),
    calibri400: 'Calibri-Regular',
    calibri700: 'Calibri-Bold',
  },
};
