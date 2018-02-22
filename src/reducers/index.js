import status from './status';
import member from './member';
import recipes from './recipes';
import noticias from './noticiasReducer';
import catalogos from './catalogosReducer';
import lotes from './lotesReducer';
import artistas from './artistasReducer';
import miembros from './miembrosReducer';
import obras from './obrasReducer';

const rehydrated = (state = false, action) => {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return true;
    default:
      return state;
  }
};

export default {
  rehydrated,
  status,
  member,
  recipes,
  noticias,
  catalogos,
  lotes,
  artistas,
  miembros,
  obras,
};
