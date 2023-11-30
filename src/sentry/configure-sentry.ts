import * as Sentry from '@sentry/react-native';

export const routingInstrumentation =
  new Sentry.ReactNavigationInstrumentation();

export function configureSentry() {
  Sentry.init({
    dsn: 'https://5de980498c7c49868cd49931671fa860@o4505324542296064.ingest.sentry.io/4505324543672320',
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.ReactNativeTracing({
        routingInstrumentation,
      }),
    ],
  });
}
