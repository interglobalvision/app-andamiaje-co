import Store from '../store/catalogos';

export const initialState = Store;

export default function catalogoReducer(state = initialState, action) {
  switch (action.type) {
    case 'CATALOGOS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'CATALOGOS_REPLACE': {
      let pastCatalogos = [];
      let activeCatalogo = {};

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        pastCatalogos = Object.keys(action.data).
          filter(key => action.data[key].startDate <= Date.now()).  // Only current & past Catalogos
          map(id => {
            let { title, startDate, saleDate, endDate, lotes } = action.data[id];

            return ({
              id,
              title,
              startDate,
              saleDate,
              endDate,
              lotes,
            })
          });

        // remove the first Catalogo from pastCatalogos array,
        // and assign it to activeCatalogo
        activeCatalogo = pastCatalogos.shift();
      }

      return {
        ...state,
        error: null,
        loading: false,
        activeCatalogo,
        pastCatalogos,
      };
    }
    default:
      return state;
  }
}
