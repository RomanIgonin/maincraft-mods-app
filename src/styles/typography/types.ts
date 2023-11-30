import { ThemeColors } from '@src/styles/theme/emotion';

export type FontStyle =
  | 'pixel'
  | 'calibri400'
  | 'calibri700'
  | 'caption400'
  | 'caption700';

export type FontSize =
  | 7
  | 8
  | 9
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 20
  | 24
  | 25
  | 26
  | 27
  | 28
  | 30;

export type UDTextProps = {
  fSize?: FontSize;
  fStyle?: FontStyle;
  color?: keyof ThemeColors;
};
