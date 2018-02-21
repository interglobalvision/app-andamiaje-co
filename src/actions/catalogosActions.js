import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'CATALOGOS_ERROR',
    data: message,
  })));
}

/**
 * Get Catalogos
 */
export function getCatalogos() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('catalogos').orderByChild('startDate')
    .on('value', (snapshot) => {
      const catalogos = snapshot.val() || {};

      return resolve(dispatch({
        type: 'CATALOGOS_REPLACE',
        data: catalogos,
      }));
    })).catch(e => console.log(e));
}

/**
 * Change Catalogo Layout Setting
 */
export function changeCatalogoLayout(setting) {
  return (dispatch) => {
    if (setting === 'grid') {
      return dispatch({
        type: 'LAYOUT_CATALOGO_GRID',
      });
    } else if (setting === 'list') {
      return dispatch({
        type: 'LAYOUT_CATALOGO_LIST',
      });
    }
  }
}
