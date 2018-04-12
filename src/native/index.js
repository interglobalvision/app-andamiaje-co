import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Sentry from 'sentry-expo';

import { StyleProvider } from 'native-base';
import getTheme from '../../native-base-theme/components';
import theme from '../../native-base-theme/variables/commonColor';
import SentryDSN  from '../lib/sentry';

import Router from './routes/index';
import Loading from './components/Loading';

console.disableYellowBox = true;

// Hide StatusBar on Android as it overlaps tabs
if (Platform.OS === 'android') StatusBar.setHidden(true);

// Seup Sentry, for error logging
Sentry.enableInExpoDevelopment = true; // https://docs.expo.io/versions/latest/guides/using-sentry.html#disabled-by-default-in-dev
Sentry.config(SentryDSN).install();

class Root extends Component {
  render() {
    const { store, persistor } = this.props;

    return(
      <Provider store={store}>
        <PersistGate
          loading={<Loading />}
          persistor={persistor}
      >
          <StyleProvider style={getTheme(theme)}>
            <Router />
          </StyleProvider>
        </PersistGate>
      </Provider>
    );
  }
}
/*
 *
Root.propTypes = {
  store: PropTypes.shape({}).isRequired,
  persistor: PropTypes.shape({}).isRequired,
};
*/

export default Root;
