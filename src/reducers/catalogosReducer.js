import Store from '../store/catalogos';
import { clone, orderBy, reverse } from 'lodash';

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

      // Pick out the props I need
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

      return {
        ...state,
        error: null,
        loading: false,
        activeCatalogo,
        pastCatalogos,
      };
    }
    case 'LAYOUT_CATALOGO_GRID': {
      const viewSettings = {
        grid: true,
        filterBy: state.viewSettings.filterBy,
        orderBy: state.viewSettings.orderBy,
      }

      return {
        ...state,
        viewSettings,
      };
    }
    case 'LAYOUT_CATALOGO_LIST': {
      const viewSettings = {
        grid: false,
        filterBy: state.viewSettings.filterBy,
        orderBy: state.viewSettings.orderBy,
      }

      return {
        ...state,
        viewSettings,
      };
    }
    case 'CATALOG_ORDERING_ARTISTA_AZ': {
      const { lotes, activeCatalogo } = state;
      const sortLotes = orderBy(activeCatalogo.lotes, lote => lote.artista.name, 'desc');

      // TODO: pass these lotes

      return {
        ...state,
      };
    }
    case 'CATALOG_ORDERING_ARTISTA_ZA': {
      const { lotes, activeCatalogo } = state;

      const sortLotes = orderBy(activeCatalogo.lotes, lote => lote.artista.name, 'asc');

      // TODO: pass these lotes

      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
