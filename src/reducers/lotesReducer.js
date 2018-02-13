import Store from '../store/lotes';

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

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        lotes = Object.keys(action.data).
          filter(key => {
            if (action.activeLotes !== undefined || action.activeLotes !== '') {
              // Find if the obra is in addedObras
              return action.activeLotes.find( lote => lote.id === key) === undefined ? false : true;
            } else {
              return true;
            }
          }).  // Only lotes in catalogo
          map(id => {
            let { title, artista, obras, price } = action.data[id];

            return ({
              id,
              title,
              artista,
              obras,
              price,
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
