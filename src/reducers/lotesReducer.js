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

      // get active Catalogo Lotes from state
      let activeLotes = state.lotes;

      if (action.data && typeof action.data === 'object' && activeLotes !== undefined || activeLotes !== '') {
        // action.data is Object, and activeLotes arg is not empty
        lotes = Object.keys(action.data).
          filter(key => {
            // Filter by activeLotes
            return activeLotes.find( lote => lote.id === key) === undefined ? false : true;
          }).  // Only lotes in catalogo
          map(id => {
            let { title, artista, obras, price } = action.data[id];

            // Pick out the props I need
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
