import React from 'react';
import { Text } from 'react-native';
import styles from '../constants/styles';

const TextBullet = () => (
  <Text style={[styles.colorDarkGrey, styles.fontSizeSmall]}>   •   </Text>
);

export default TextBullet;
