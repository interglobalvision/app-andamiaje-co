import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'LOTES_ERROR',
    data: message,
  })));
}

/**
 * Get Lotes
 */
export function getLotes(activeLotes) {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('lotes').orderByChild('title')
    .on('value', (snapshot) => {
      const lotes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'LOTES_REPLACE',
        data: lotes,
        activeLotes
      }));
    })).catch(e => console.log(e));
}
