import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import styles from '../constants/styles';

class Toast extends Component {
  render() {
    if(this.props.text === '') {
      return null;
    } else {
      return (
        <View style={[
          styles.container,
          styles.bordered,
          styles.backgroundWhite,
          styles.paddingTopSmall,
          styles.paddingBottomSmall,
          styles.flexRow,
          {
            alignItems: 'center',
            justifyContent: 'space-between',
          },
        ]}>
          <Text>{this.props.text}</Text>
          <Text>{this.props.text}</Text>
          <Text>{this.props.text}</Text>
          <Text>{this.props.text}</Text>
          <Text>{this.props.text}</Text>
          <Text>{this.props.text}</Text>
        </View>
      );
    }
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  text: state.toast.text
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
