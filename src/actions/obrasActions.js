import { Firebase, FirebaseRef } from '../lib/firebase';
import Sentry from 'sentry-expo';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'OBRAS_ERROR',
    data: message,
  })));
}

/**
 * Get Obras
 */
export function getObras() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return (dispatch) => {

    return new Promise(resolve => FirebaseRef.child('obras').orderByChild('title')
      .on('value', (snapshot) => {
        const obras = snapshot.val() || {};

        return resolve(dispatch({
          type: 'OBRAS_REPLACE',
          data: obras,
        }));
      })).catch(e => {
        console.log(e);
        // capture the exception
        Sentry.captureException(new Error(e));
      });
  }
}
