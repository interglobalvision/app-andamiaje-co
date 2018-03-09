import * as FirebaseModule from 'firebase';
import firebaseDev from '../constants/firebase';
import firebaseProd from '../constants/firebaseProduction';

let firebaseConfig = firebaseDev;

if (Expo.Constants.manifest.releaseChannel === 'prod-v1') {
  firebaseConfig = firebaseProd;
}

const {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null' &&
  authDomain !== 'null' &&
  databaseURL !== 'null' &&
  storageBucket !== 'null' &&
  messagingSenderId !== 'null'
) {
  FirebaseModule.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
  });

  firebaseInitialized = true;
}

export const FirebaseRef = firebaseInitialized ? FirebaseModule.database().ref() : null;
export const Firebase = firebaseInitialized ? FirebaseModule : null;
