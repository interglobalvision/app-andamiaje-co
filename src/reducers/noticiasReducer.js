import Store from '../store/noticias';

export const initialState = Store;

export default function noticiaReducer(state = initialState, action) {
  switch (action.type) {
    case 'NOTICIAS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'NOTICIAS_REPLACE': {
      let noticias = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        noticias = Object.keys(action.data).
          filter(key => action.data[key].published).  // Only published Noticias
          reverse(). // Reverse data becasue it comes sort by publishedDate ASC
          map(id => {
            const {
              title,
              rawContent,
              publishDate,
              images,
              video,
              artista,
            } = action.data[id];

            return ({
              id,
              title,
              rawContent,
              publishDate,
              images,
              video,
              artista,
            })
          });
      }

      return {
        ...state,
        error: null,
        loading: false,
        noticias,
      };
    }
    default:
      return state;
  }
}
