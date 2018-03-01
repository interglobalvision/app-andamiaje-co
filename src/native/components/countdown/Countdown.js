import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from '../../constants/styles';

import CountdownTitle from '../countdown/CountdownTitle';
import CountdownClock from '../countdown/CountdownClock';

class Countdown extends React.Component {
  static propTypes = {
    activeCatalogo: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { activeCatalogo } = this.props;

    const currentDate = Date.now();
    const oneDay = 86400000;
    const countdownBeforeSale = oneDay * 5;
    const timeUntilSale = activeCatalogo.saleDate - currentDate;

    const saleSoon = (timeUntilSale < countdownBeforeSale) && (currentDate < activeCatalogo.saleDate) ? true : false;

    console.log('Sale Soon', saleSoon);

    const saleStarted = (currentDate > activeCatalogo.saleDate) && (currentDate < activeCatalogo.endDate) ? true : false;

    console.log('Sale Started', saleStarted);

    const saleEnded = currentDate > activeCatalogo.endDate || (saleStarted && currentDate < oneDay + activeCatalogo.endDate) ? true : false;

    console.log('Sale Ended', saleEnded);

    return (
      <View>
        {(saleSoon || saleStarted || saleEnded) &&
          <CountdownTitle title={activeCatalogo.title} saleStarted={saleStarted} saleEnded={saleEnded} />
        }
        {saleSoon &&
          <CountdownClock countdownTo={activeCatalogo.saleDate} />
        }
        {saleStarted &&
          <CountdownClock countdownTo={activeCatalogo.endDate} />
        }
      </View>
    );
  }
}

export default Countdown;
