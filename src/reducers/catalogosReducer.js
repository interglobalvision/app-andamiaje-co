import Store from '../store/catalogos';

export const initialState = Store;

export default function catalogoReducer(state = initialState, action) {
  switch (action.type) {
    case 'CATALOGOS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'CATALOGOS_REPLACE': {
      let pastCatalogos = [];
      let activeCatalogo = {};
      let futureCatalogos = [];

      // Get Past Catalogos. Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        pastCatalogos = Object.keys(action.data).
          filter(key => action.data[key].startDate <= Date.now()).  // Only current & past Catalogos
          map(id => {
            const { title, startDate, saleDate, endDate, lotes } = action.data[id];

            return ({
              id,
              title,
              startDate,
              saleDate,
              endDate,
              lotes,
            })
          });

        // remove the first Catalogo from pastCatalogos array,
        // and assign it to activeCatalogo
        activeCatalogo = pastCatalogos.shift();
      }

      // Get Future Catalogos. Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        futureCatalogos = Object.keys(action.data).
          filter(key => action.data[key].startDate > Date.now()).  // Only current & past Catalogos
          map(id => {
            const { title, startDate, saleDate, endDate, lotes } = action.data[id];

            return ({
              id,
              title,
              startDate,
              saleDate,
              endDate,
              lotes,
            })
          });

        // Remove activeCatalogo from futureCatalogos just in case
        futureCatalogos = futureCatalogos.filter( catalogo => catalogo.id !== activeCatalogo.id );
      }

      return {
        ...state,
        error: null,
        loading: false,
        activeCatalogo,
        pastCatalogos,
        futureCatalogos,
      };
    }
    case 'CHANGE_CATALOGO_LAYOUT': {
      const viewSettings = {
        grid: action.grid,
        filterBy: state.viewSettings.filterBy,
        orderBy: state.viewSettings.orderBy,
      }

      return {
        ...state,
        viewSettings,
      };
    }
    case 'CHANGE_CATALOGO_ORDER': {
      const viewSettings = {
        grid: state.viewSettings.grid,
        filterBy: state.viewSettings.filterBy,
        orderBy: action.order,
      }

      return {
        ...state,
        viewSettings,
      };
    }
    case 'CHANGE_CATALOGO_FILTER': {
      const viewSettings = {
        grid: state.viewSettings.grid,
        filterBy: action.tecnica,
        orderBy: state.viewSettings.orderBy,
      }

      return {
        ...state,
        viewSettings,
      };
    }

    default:
      return state;

  }
}
