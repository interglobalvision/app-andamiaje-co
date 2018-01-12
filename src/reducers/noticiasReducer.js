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
      console.log('REDUCER', action.data);
      let noticias = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        console.log('NOTICIAS_REPLACE', action.data);
        noticias = Object.keys(action.data).map((key,index) => {
          var item = action.data[key];

          console.log('KEY', key);
          console.log('ITEM', item);

          return ({
            id: key,
            title: item.title,
          })
        });
      }

      console.log('STATE',state);

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
