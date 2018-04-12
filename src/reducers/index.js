import status from './status';
import member from './member';
import toast from './toastReducer';
import confetti from './confettiReducer';
import recipes from './recipes';
import noticias from './noticiasReducer';
import catalogos from './catalogosReducer';
import lotes from './lotesReducer';
import artistas from './artistasReducer';
import miembros from './miembrosReducer';
import calendar from './calendarReducer';
import obras from './obrasReducer';
import countdown from './countdownReducer';


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
  toast,
  confetti,
  member,
  recipes,
  noticias,
  catalogos,
  lotes,
  artistas,
  miembros,
  calendar,
  obras,
  countdown,
};
