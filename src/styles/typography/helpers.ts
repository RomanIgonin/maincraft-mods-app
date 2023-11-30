import { Theme } from '@emotion/react';
import { ThemeColors } from '@src/styles/theme/emotion';
import { UDTextProps } from '@src/styles/typography/types';
import { TextSizeMap } from '@src/styles/typography/maps';

const resolveTextSizeValue = (
  props: UDTextProps,
  property: 'size' | 'lineHeight',
): string => {
  const sizeType = props.fSize || 24;
  const size = TextSizeMap[sizeType][property];
  return `${size}px`;
};

export const resolveTextFontSize = (props: UDTextProps): string => {
  return resolveTextSizeValue(props, 'size');
};

export const resolveTextLineHeight = (props: UDTextProps): string => {
  return resolveTextSizeValue(props, 'lineHeight');
};

export const resolveFontFamily = (
  props: UDTextProps & { theme: Theme },
): string => {
  const styleType = props.fStyle || 'pixel';
  const fontFamilyName = props.theme.fonts[styleType];
  return `font-family: ${fontFamilyName}`;
};

export const resolveTextColor = (
  props: UDTextProps & { theme: Theme },
): string => {
  const targetColor = props.color || 'dark';
  return `${props.theme.colors[targetColor as keyof ThemeColors]};`;
};
