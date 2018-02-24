import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../constants/styles';

const SectionHeader = ({ title }) => (
  <View style={[
    styles.container,
    styles.backgroundWhite,
    styles.bordered,
    styles.sectionHeader
  ]}>
    <Text>{title}</Text>
  </View>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
