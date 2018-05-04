import { Firebase, FirebaseRef } from '../lib/firebase';
import Sentry from 'sentry-expo';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'NOTICIAS_ERROR',
    data: message,
  })));
}

/**
 * Get Noticias
 */
export function getNoticias() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('noticias').orderByChild('publishDate')
    .on('value', (snapshot) => {
      const noticias = snapshot.val() || {};

      return resolve(dispatch({
        type: 'NOTICIAS_REPLACE',
        data: noticias,
      }));
    })).catch((e) => {
    console.log(e);
    // capture the exception
    Sentry.captureException(new Error(e));
  });
}
