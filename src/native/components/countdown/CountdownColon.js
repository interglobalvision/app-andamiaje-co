import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import styles from '../../constants/styles';

const CountdownColon = () => (
  <Text style={[
      styles.colorWhite,
      styles.fontFamilyMedium,
      styles.fontSizeMid,
      styles.paddingLeftTiny,
      styles.paddingRightTiny,
    ]}
  >:
  </Text>
);

export default CountdownColon;
