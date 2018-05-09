import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../constants/styles';

const CountdownNumber = ({
  number,
  title,
}) => (
  <View style={[
      styles.flexColumn,
      styles.flexCenter,
    ]}
  >
    <Text style={[
        styles.colorWhite,
        styles.fontFamilyMedium,
        styles.fontSizeMid,
      ]}
    >{number}
    </Text>
    <Text style={[
        styles.colorWhite,
        styles.fontFamilyMedium,
        styles.fontSizeTiny,
      ]}
    >{title}
    </Text>
  </View>
);

export default CountdownNumber;
