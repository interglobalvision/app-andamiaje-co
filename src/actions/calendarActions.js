import { Firebase, FirebaseRef } from '../lib/firebase';

/**
 * Set an Error Message
 */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'CALENDAR_ERROR',
    data: message,
  })));
}

/**
 * Get Calendar
 */
export function getCalendar() {
  if (Firebase === null) {
    return () => new Promise(resolve => resolve());
  }

  return dispatch => new Promise(resolve => FirebaseRef.child('calendar').orderByChild('publishDate')
    .on('value', (snapshot) => {
      const calendar = snapshot.val() || {};

      return resolve(dispatch({
        type: 'CALENDAR_REPLACE',
        data: calendar,
      }));
    })).catch(e => console.log(e));
}
