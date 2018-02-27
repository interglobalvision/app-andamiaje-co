import Store from '../store/toast';

export const initialState = Store;

export default function toastReducer(state = initialState, action) {
  const { text, type } = action;

  switch (type) {
    case 'ADD_TOAST': {
      return {
        toast: text,
      }
    }
    case 'CLEAR_TOAST': {
      return initialState;
    }
    default:
      return state;
  }
}
