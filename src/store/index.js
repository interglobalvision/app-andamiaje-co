import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistCombineReducers, createMigrate } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { migrations } from './migrations';

// Redux Persist config
const config = {
  key: 'root',
  version: 6,
  storage,
  blacklist: ['status', 'countdown', 'catalogos'],
  migrate: createMigrate(migrations, { debug: true }),
};

const reducer = persistCombineReducers(config, reducers);

const middleware = [thunk];

const configureStore = () => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  // run the app once with this line uncommented to purge persistant state
  // persistor.purge();

  return { persistor, store };
};

export default configureStore;
