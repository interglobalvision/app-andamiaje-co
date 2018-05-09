import Store from '../store/collection';
export const initialState = Store;

export default function loteReducer(state = initialState, action) {
  switch (action.type) {
    case 'COLLECTION_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }

    case 'COLLECTION_LOTES_REPLACE': {
      const { collectionLotes } = action || [];

      return {
        ...state,
        error: null,
        loading: false,
        lotes: collectionLotes,
      };
    }

    default:
      return state;
  }
}
