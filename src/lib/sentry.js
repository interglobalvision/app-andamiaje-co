// Cloud functions url for dev
let SentryDSN = 'https://128ef386e082446fb63706d298267c96@sentry.io/1185630';

// Cloud functions url for prod
if (Expo.Constants.manifest.releaseChannel === 'prod-v1') {
  SentryDSN = 'https://afbb40e52cde4bb1b3fb528db95e9ff6@sentry.io/1141255';
}

export default SentryDSN;
