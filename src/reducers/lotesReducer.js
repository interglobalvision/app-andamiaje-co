import Store from '../store/lotes';
import _filter from 'lodash/filter';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';
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

        lotes = action.activeLotes.
          map(lote => {
            const { title, artista, obras, price, tecnica, owner } = action.data[lote.id];

            // Remove undefined values
            const cleanLote = _omitBy({
              id: lote.id,
              title,
              artista,
              obras,
              price,
              tecnica,
              owner,
            }, _isNil);

            return cleanLote;
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
