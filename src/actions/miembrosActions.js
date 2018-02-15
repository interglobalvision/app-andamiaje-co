import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'MIEMBROS_ERROR',
    data: message,
  })));
}

/**
 * Get Miembros
 */
export function getMiembros() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('users').orderByChild('role').equalTo('member')
    .on('value', (snapshot) => {
      const miembros = snapshot.val() || {};

      return resolve(dispatch({
        type: 'MIEMBROS_REPLACE',
        data: miembros,
      }));
    })).catch(e => console.log(e));
}
