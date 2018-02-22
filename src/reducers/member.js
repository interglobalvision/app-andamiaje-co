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
      if (action.removedLote) {
        const wishlist = state.wishlist;

        // lodash func removes from array by value
        const newWishlist = remove(wishlist, (lote) => {
          return lote.id !== action.removedLote.id;
        });

        return {
          ...state,
          wishlist: newWishlist,
        };
      }
      return initialState;
    }
    case 'USER_WISHLIST_ADD': {
      if (action.addedLote) {
        let wishlist = state.wishlist;

        // push new lote id into wishlist
        wishlist.push(action.addedLote);
        // lodash func removes duplicates
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
