// Cloud functions url for dev
let FunctionsUrl = 'https://us-central1-igv-andamiaje-co.cloudfunctions.net';

// Cloud functions url for prod
if (Expo.Constants.manifest.releaseChannel === 'prod-v1') {
  FunctionsUrl = 'https://us-central1-prod-andamiaje-co.cloudfunctions.net'
}

export const CloudFunctionsUrl = FunctionsUrl;
