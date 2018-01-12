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
        noticias = Object.keys(action.data).map((key,index) => {
          var item = action.data[key];

          return ({
            id: key,
            title: item.title,
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
