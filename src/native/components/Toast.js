import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import styles from '../constants/styles';

class Toast extends Component {

  render() {
    if (this.props.message === '' || this.props.message === null) {
      return null;
    } else {
      return (
        <View style={[
          styles.container,
          styles.backgroundWhite,
          styles.paddingTopSmall,
          styles.paddingBottomSmall,
          styles.flexRow,
          styles.flexCenter,
          styles.toast,
        ]}>
          <Text style={[styles.fontSizeSmall]}>{this.props.message}</Text>
        </View>
      );
    }
  }
}

const mapDispatchToProps = {
};

const mapStateToProps = state => ({
  message: state.toast.message
});

export default connect(mapStateToProps, mapDispatchToProps)(Toast);
