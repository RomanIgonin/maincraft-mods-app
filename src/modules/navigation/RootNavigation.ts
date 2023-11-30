import {
  CommonActions,
  NavigationContainerRef,
  StackActions,
} from '@react-navigation/native';
import React from 'react';

// Ссылка на флаг, означающий собрано ли приложение
export const isAppMountedRef = React.createRef<boolean>();
// Ссылка на экземпляр навигации
export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigate(...args: any) {
  safetyNavigationCall(() => {
    navigationRef.current?.navigate(...args);
  });
}

// Метод-обертка над методами библиотеки
export function push(...args: Parameters<(typeof StackActions)['push']>) {
  safetyNavigationCall(() => {
    navigationRef.current?.dispatch(StackActions.push(...args));
  });
}

// Метод-обертка над методами библиотеки
export function pop(...args: Parameters<(typeof StackActions)['pop']>) {
  safetyNavigationCall(() => {
    navigationRef.current?.dispatch(StackActions.pop(...args));
  });
}

// Функция-помощник для безопасного вызова методов навигации
// Вызывает методы только после рендера приложения и создания экземпляра объекта навигации
function safetyNavigationCall(successCallback: () => void | string) {
  if (canUseNavigation()) {
    return successCallback();
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
    setTimeout(() => {
      return safetyNavigationCall(successCallback);
    }, 100);
  }
}

// Функция-помощник для проверки рендера приложения и создания экземпляра объекта навигации
function canUseNavigation() {
  return !!(isAppMountedRef.current && navigationRef.current);
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
export function navigateAndReset(routeName: string, params?: any) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
}

export function navigateBack() {
  safetyNavigationCall(() => {
    navigationRef.current?.goBack();
  });
}
