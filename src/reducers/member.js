import Store from '../store/member';
import { uniq, remove } from 'lodash';
import _unset from 'lodash/unset';

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
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          firstName: action.data.firstName,
          lastName: action.data.lastName,
          signedUp: action.data.signedUp,
          role: action.data.role,
          wishlist: action.data.wishlist,
          tokens: action.data.tokens,
          collection: action.data.collection,
        };
      }
      return initialState;
    }
    case 'USER_WISHLIST_REMOVE': {
      if (action.wishlist) {
        return {
          ...state,
          wishlist: action.wishlist,
        };
      }
      return state;
    }
    case 'USER_WISHLIST_ADD': {
      if (action.addedLote) {
        let wishlist = state.wishlist;

        // push new lote id into wishlist
        wishlist = {
          ...wishlist,
          [action.addedLote.id]: action.addedLote,
        };

        return {
          ...state,
          wishlist,
        };
      }
      return state;
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
