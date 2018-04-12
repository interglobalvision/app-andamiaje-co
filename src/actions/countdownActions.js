/*
 * Update Countdown
 */
export function updateCountdown() {
  return (dispatch, getState) => {

    activeCatalogo = getState().catalogos.activeCatalogo;

    dispatch({
      type: 'UPDATE_COUNTDOWN',
      activeCatalogo: getState().catalogos.activeCatalogo,
    });
  };
}
