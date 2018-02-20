import Store from '../store/member';
import { uniq, remove } from 'lodash';

export const initialState = Store;

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          uid: action.data.uid,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
        };
      }
      return initialState;
    }
    case 'USER_WISHLIST_REMOVE': {
      if (action.removeLote) {
        const wishlist = state.wishlist;

        const newWishlist = remove(wishlist, (lote) => {
          return lote !== action.removeLote;
        });

        return {
          ...state,
          wishlist: newWishlist,
        };
      }
      return initialState;
    }
    case 'USER_WISHLIST_ADD': {
      if (action.addLote) {
        let wishlist = state.wishlist;

        wishlist.push(action.addLote);

        wishlist = uniq(wishlist);

        return {
          ...state,
          wishlist
        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      return initialState;
    }
    default:
      return state;
  }
}
