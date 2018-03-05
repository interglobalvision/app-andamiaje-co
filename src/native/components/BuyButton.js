import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import styles from '../constants/styles';

class BuyButton extends React.Component {
  static propTypes = {
    error: PropTypes.string,
  }

  static defaultProps = {
    error: null,
  }

  constructor(props) {
    super(props);
  }

  handleChange = () => {

  }

  handleSubmit = () => {

  }

  componentDidMount() {

  }

  componentWillUpdate() {

  }

  render() {
    const { } = this.props;

    return (
      <View>

      </View>
    );
  }
}

export default BuyButton;
