import { delay } from '../lib/utilities';

export function addToast(options = {}) {
  return {
    ...options,
    type: 'ADD_TOAST',
  };
}

export function clearToast() {
  return {
    type: 'CLEAR_TOAST',
  };
}

export function showNotification(dispatch, message) {
  dispatch(addToast({ message }));

  return delay(5000).then(() => {
    dispatch(clearToast());
  });
}
