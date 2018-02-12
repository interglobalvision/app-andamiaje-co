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
      let catalogos = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        catalogos = Object.keys(action.data).
          filter(key => action.data[key].published).  // Only published Catalogos
          reverse(). // Reverse data becasue it comes sort by publishedDate ASC
          map(id => {
            let { title, startDate, endDate } = action.data[id];

            return ({
              id,
              title,
              startDate,
              endDate,
            })
          });
      }

      return {
        ...state,
        error: null,
        loading: false,
        catalogos,
      };
    }
    default:
      return state;
  }
}
