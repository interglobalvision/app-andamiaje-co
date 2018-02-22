import Store from '../store/lotes';
import { orderBy } from 'lodash';
import _filter from 'lodash/filter';
export const initialState = Store;

export default function loteReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOTES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }

    case 'LOTES_REPLACE': {
      let lotes = [];

      if (action.data && typeof action.data === 'object' && action.activeLotes !== undefined || action.activeLotes !== '') {
        // action.data is Object, and activeLotes arg is not empty
        lotes = Object.keys(action.data).
          filter(key => {
            // Filter by activeLotes
            return action.activeLotes.find( lote => lote.id === key) === undefined ? false : true;
          }).  // Only lotes in catalogo
          map(id => {
            const { title, artista, obras, price, tecnica } = action.data[id];

            // Pick out the props I need
            return ({
              id,
              title,
              artista,
              obras,
              price,
              tecnica
            })
          });
      }

      return {
        ...state,
        error: null,
        loading: false,
        lotes,
      };
    }

    default:
      return state;
  }
}
