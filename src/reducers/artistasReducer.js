import Store from '../store/artistas';

import { orderBy } from 'lodash';

export const initialState = Store;

export default function artistaReducer(state = initialState, action) {
  switch (action.type) {
    case 'ARTISTAS_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'ARTISTAS_REPLACE': {
      let artistas = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        artistas = Object.keys(action.data)
          .filter(key => action.data[key].active) // Only active Artistas
          .map((id) => {
            const {
              name, gallery, galleryUrl, websiteUrl, country, bioRawContent, cvRawContent, images, portfolio, video,
            } = action.data[id];

            return ({
              id,
              name,
              gallery,
              galleryUrl,
              websiteUrl,
              country,
              bioRawContent,
              cvRawContent,
              images,
              portfolio,
              video,
            });
          });

        artistas = orderBy(artistas, ['name'], ['asc']);
      }

      return {
        ...state,
        error: null,
        loading: false,
        artistas,
      };
    }
    default:
      return state;
  }
}
