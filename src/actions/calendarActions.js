import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Toggle show/hide calendar
 */
export function toggleCalendar() {
  return {
    type: 'TOGGLE_CALENDAR',
  };
}
