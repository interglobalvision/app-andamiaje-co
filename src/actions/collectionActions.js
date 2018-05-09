import { Firebase, FirebaseRef } from '../lib/firebase';
import Sentry from 'sentry-expo';
import _filter from 'lodash/filter';
import _find from 'lodash/find';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'LOTES_ERROR',
    data: message,
  })));
}

export function getCollectionLotes(collection) {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return (dispatch, getState) => {

    return new Promise(resolve => FirebaseRef.child('lotes').orderByChild('title')
      .on('value', (snapshot) => {
        const lotes = snapshot.val() || {};

        const collectionLotes = _filter(lotes, (lote, key) => {
          return collection[key];
        });

        return resolve(dispatch({
          type: 'COLLECTION_LOTES_REPLACE',
          collectionLotes,
        }));
      })).catch(e => {
        console.log(e);
        // capture the exception
        Sentry.captureException(new Error(e));
      });
  }
}
