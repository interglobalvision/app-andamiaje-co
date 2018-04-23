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

export function startNoticiasCountdown() {
  return {
    type: 'START_NOTICIAS_COUNTDOWN',
  }
}

export function stopNoticiasCountdown() {
  return {
    type: 'STOP_NOTICIAS_COUNTDOWN',
  }
}

export function startCatalogosCountdown() {
  return {
    type: 'START_CATALOGOS_COUNTDOWN',
  }
}

export function stopCatalogosCountdown() {
  return {
    type: 'STOP_CATALOGOS_COUNTDOWN',
  }
}

export function startWishlistCountdown() {
  return {
    type: 'START_WISHLIST_COUNTDOWN',
  }
}

export function stopWishlistCountdown() {
  return {
    type: 'STOP_WISHLIST_COUNTDOWN',
  }
}

export function startArtistaCountdown() {
  return {
    type: 'START_ARTISTA_COUNTDOWN',
  }
}

export function stopArtistaCountdown() {
  return {
    type: 'STOP_ARTISTA_COUNTDOWN',
  }
}

export function startLoteCountdown() {
  return {
    type: 'START_LOTE_COUNTDOWN',
  }
}

export function stopLoteCountdown() {
  return {
    type: 'STOP_LOTE_COUNTDOWN',
  }
}
