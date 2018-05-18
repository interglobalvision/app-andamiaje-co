import React from 'react';
import PropTypes from 'prop-types';
import styles from '../constants/styles';

const Error = ({ title, content }) => (
  <View style={[styles.container, styles.paddingTopBasic]}>
    <Text style={styles.fontBold}>{title}</Text>
    <Text style={styles.fontSizeSmall}>{content}</Text>
  </View>
);

Error.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

Error.defaultProps = {
  title: 'Uh oh',
  content: 'An unexpected error came up',
};

export default Error;
