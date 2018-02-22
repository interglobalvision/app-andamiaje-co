import Store from '../store/obras';

export const initialState = Store;

export default function obraReducer(state = initialState, action) {
  switch (action.type) {
    case 'OBRAS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'OBRAS_REPLACE': {
      let obras = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        obras = Object.keys(action.data).
          map(id => {
            const {
              title,
              artista,
              notesRawContent,
              images,
              dimensions,
              materials,
              year,
            } = action.data[id];

            return ({
              id,
              title,
              artista,
              notesRawContent,
              images,
              dimensions,
              materials,
              year,
            })
          });
      }

      return {
        ...state,
        error: null,
        loading: false,
        obras,
      };
    }
    default:
      return state;
  }
}
