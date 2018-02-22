import Store from '../store/calendar';

export const initialState = Store;

export default function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_CALENDAR': {
      return {
        show: !state.show,
      };
    }
    default:
      return state;
  }
}
