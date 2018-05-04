import Store from '../store/miembros';

import { orderBy } from 'lodash';

export const initialState = Store;

export default function miembroReducer(state = initialState, action) {
  switch (action.type) {
    case 'MIEMBROS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'MIEMBROS_REPLACE': {
      let miembros = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        miembros = Object.keys(action.data)
          .filter(key => action.data[key].active) // Only active Miembros
          .map((id) => {
            const {
              displayName, images, collection, tokens,
            } = action.data[id];

            return ({
              id,
              displayName,
              images,
              collection,
              tokens,
            });
          });

        miembros = orderBy(miembros, ['displayName'], ['asc']);
      }

      return {
        ...state,
        error: null,
        loading: false,
        miembros,
      };
    }
    default:
      return state;
  }
}
