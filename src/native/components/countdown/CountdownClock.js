import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../constants/styles';
import { connect } from 'react-redux';
import { requestInterval, clearRequestInterval } from '../../../lib/utilities';
import { updateCountdown } from '../../../actions/countdownActions';
import CountdownNumber from './CountdownNumber';
import CountdownColon from './CountdownColon';

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

    this.updateClock = this.updateClock.bind(this);
  }

  componentDidMount() {
    this.updateClock();
    this.timeInterval = requestInterval(this.updateClock, 500);
  }

  componentWillUnmount() {
    clearRequestInterval(this.timeInterval);
  }

  updateClock() {
    // Call the redux action
    this.props.updateCountdown(Date.now());

    const t = this.props.countdownTo - Date.now();
    let seconds = ('0' + (Math.floor( (t/1000) % 60 ))).slice(-2);
    let minutes = ('0' + (Math.floor( (t/1000/60) % 60 ))).slice(-2);
    let hours = ('0' + (Math.floor( (t/(1000*60*60)) % 24 ))).slice(-2);
    let days = ('0' + (Math.floor( t/(1000*60*60*24) ))).slice(-2);

    if (t > 0) {
      this.setState({
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
      });
    } else if (t <= 0) {
      clearRequestInterval(this.timeInterval);
    }
  }

  render() {
    return (
      <View style={[
        styles.backgroundBlack,
        styles.paddingTopSmall,
        styles.paddingBottomSmall,
        styles.flexRow,
        styles.alignStart,
        styles.justifyCenter,
      ]}>
          <CountdownNumber number={this.state.days} title={'Días'} />
          <CountdownColon />
          <CountdownNumber number={this.state.hours} title={'Horas'} />
          <CountdownColon />
          <CountdownNumber number={this.state.minutes} title={'Min'} />
          <CountdownColon />
          <CountdownNumber number={this.state.seconds} title={'Seg'} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  countdown: state.countdown || {},
});

const mapDispatchToProps = {
  updateCountdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(CountdownClock);
