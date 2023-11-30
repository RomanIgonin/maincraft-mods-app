import '@emotion/react';

export interface ThemeColors {
  light: string;
  backgroundLight: string;
  dark: string;
  grayLight: string;
  gray: string;
  grayDark: string;
  pinkLight: string;
  redLight: string;
  red: string;
  green: string;
  blue: string;
}

export interface ThemeFonts {
  pixel: string;
  caption400: string;
  caption700: string;
  calibri400: string;
  calibri700: string;
}

declare module '@emotion/react' {
  export interface Theme {
    colors: ThemeColors;
    fonts: ThemeFonts;
  }
}
