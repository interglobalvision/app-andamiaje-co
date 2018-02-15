import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'ARTISTAS_ERROR',
    data: message,
  })));
}

/**
 * Get Artistas
 */
export function getArtistas() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('artistas').orderByChild('name')
    .on('value', (snapshot) => {
      const artistas = snapshot.val() || {};

      return resolve(dispatch({
        type: 'ARTISTAS_REPLACE',
        data: artistas,
      }));
    })).catch(e => console.log(e));
}
