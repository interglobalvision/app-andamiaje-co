export function addToast(options = {}) {
  return {
    ...options,
    type: 'ADD_TOAST'
  };
}

export function clearToast() {
  return {
    type: 'CLEAR_TOAST'
  };
}

export function showNotification(dispatch, message) {
  dispatch(addToast({ message: message }));

  return delay(3000).then(() => {
    dispatch(clearToast());
  });

}

const delay = (ms) => new Promise(resolve =>
  setTimeout(resolve, ms)
);
