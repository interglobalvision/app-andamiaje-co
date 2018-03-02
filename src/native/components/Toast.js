import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { delay } from '../../lib/utilities';
import styles from '../constants/styles';

class Toast extends Component {
  componentDidUpdate() {
    if(this.view !== undefined && this.view !== null) {
      this.animateToast(this.view);
    }
  }

  animateToast(viewRef) {
    viewRef.slideInUp(800)
      .then(() => delay(3000))
      .then(() => viewRef.slideOutDown(1000));
  }

  render() {
    handleViewRef = ref => this.view = ref;

    if (this.props.message === '' || this.props.message === null) {
      return null;
    } else {
      return (
        <Animatable.View
          ref={handleViewRef}
          style={[
            styles.container,
            styles.backgroundWhite,
            styles.paddingTopSmall,
            styles.paddingBottomSmall,
            styles.flexRow,
            styles.flexCenter,
            styles.toast,
        ]}>
          <Text style={[styles.fontSizeSmall, styles.textAlignCenter]}>{this.props.message}</Text>
        </Animatable.View>
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
