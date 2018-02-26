import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../constants/styles';

const Messages = ({ message, type }) => (
  <View style={[styles.paddingTopSmall, styles.container]}>
    <Text style={[styles.fontFamilyItalic, styles.fontSizeSmall, styles.textAlignCenter]}>{message}</Text>
  </View>
);

Messages.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'info']),
};

Messages.defaultProps = {
  message: 'An unexpected error came up',
  type: 'error',
};

export default Messages;
