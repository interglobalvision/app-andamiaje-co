import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../constants/styles';

class CountdownClock extends React.Component {
  static propTypes = {
    countdownTo: PropTypes.number.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount = () => {
    this.updateClock();
    this.timeInterval = setInterval(this.updateClock, 1000);
  }

  componentWillUnmount = () => {
    clearInterval(this.timeInterval);
  }

  updateClock = () => {
    const t = this.props.countdownTo - Date.now();
    let seconds = ('0' + (Math.floor( (t/1000) % 60 ))).slice(-2);
    let minutes = ('0' + (Math.floor( (t/1000/60) % 60 ))).slice(-2);
    let hours = ('0' + (Math.floor( (t/(1000*60*60)) % 24 ))).slice(-2);
    let days = ('0' + (Math.floor( t/(1000*60*60*24) ))).slice(-2);

    this.setState({
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });

    if (t <= 0) {
      clearInterval(this.timeInterval);
    }
  }

  render() {
    return (
      <View style={[
        styles.backgroundBlack,
        styles.flexCenter,
        styles.paddingTopSmall,
        styles.paddingBottomSmall,
      ]}>
        <Text style={[
          styles.colorWhite,
          styles.fontFamilyMedium,
          styles.fontSizeMid,
        ]}>{this.state.days} : {this.state.hours} : {this.state.minutes} : {this.state.seconds}</Text>
      </View>
    );
  }
}

export default CountdownClock;
