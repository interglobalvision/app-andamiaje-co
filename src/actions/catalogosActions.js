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
export function changeCatalogoLayout(grid) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_CATALOGO_LAYOUT',
      grid
    });
  }
}

/*
 * Change Catalogo Ordering
 */
export function changeCatalogoOrder(order) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_CATALOGO_ORDER',
      order
    });
  }
}

/*
 * Change Catalogo Filtering
 */
export function changeCatalogoFilter(tecnica) {
  return (dispatch) => {
    return dispatch({
      type: 'CHANGE_CATALOGO_FILTER',
      tecnica
    });
  }
}
