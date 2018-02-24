import React from 'react';
import { View, Image, Dimensions } from 'react-native';
import { Font } from 'expo';
import Root from './src/native/index';
import configureStore from './src/store/index';
import styleConstants from './src/native/constants/styleConstants';
import styles from './src/native/constants/styles';
import { setCustomText } from 'react-native-global-props';
import Logo from './src/images/andamiaje-logo.png';

const { persistor, store } = configureStore();

const { width, height } = Dimensions.get('window');

export default class App extends React.Component {
  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'suisse-intl-regular': require('./assets/fonts/SuisseIntl-Regular.otf'),
      'suisse-intl-italic': require('./assets/fonts/SuisseIntl-RegularItalic.otf'),
      'suisse-intl-medium': require('./assets/fonts/SuisseIntl-Medium.otf'),
    });

    setCustomText({style: styles.defaultText});

    this.setState({ fontLoaded: true });
  }
  render() {
    if (this.state.fontLoaded) {
      return <Root store={store} persistor={persistor} />;
    }
    return (
      <View style={[
        styles.flexCenter,
        {
          height: height,
          width: width
        }
      ]}>
        <Image
          source={require('./src/images/andamiaje-logo.png')}
          style={{
            height: 40,
            width: 163,
          }}
        />
      </View>
    )
  }
}
