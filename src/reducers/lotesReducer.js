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
            const { title, artista, obras, price } = action.data[id];

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

    case 'LOTES_ORDERING_ARTISTA_AZ': {
      const lotes = orderBy(state.lotes, lote => lote.artista.name, 'asc');

      return {
        ...state,
        lotes,
      };
    }

    case 'LOTES_ORDERING_ARTISTA_ZA': {
      const lotes = orderBy(state.lotes, lote => lote.artista.name, 'desc');

      return {
        ...state,
        lotes,
      };
    }

    case 'LOTES_ORDERING_PRICE_ASC': {
      const lotes = orderBy(state.lotes, lote => lote.price, 'asc');

      return {
        ...state,
        lotes,
      };
    }

    case 'LOTES_ORDERING_PRICE_DESC': {
      const lotes = orderBy(state.lotes, lote => lote.price, 'desc');

      return {
        ...state,
        lotes,
      };
    }

    case 'LOTES_FILTERING_PINTURA': {
      const lotes = _filter(state.lotes, lote => lote.tecnica.includes('pintura') );

      return {
        ...state,
        lotes,
      };
    }

    case 'LOTES_FILTERING_ESCULTURA': {
      const lotes = _filter(state.lotes, lote => lote.tecnica.includes('escultura') );

      return {
        ...state,
        lotes,
      };
    }

    case 'LOTES_FILTERING_DIBUJO': {
      const lotes = _filter(state.lotes, lote => lote.tecnica.includes('dibujo') );

      return {
        ...state,
        lotes,
      };
    }

    default:
      return state;
  }
}
