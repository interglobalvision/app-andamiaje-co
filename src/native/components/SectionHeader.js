import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Spacer from './Spacer';

const SectionHeader = ({ title }) => (
  <View style={{ flex: 1 }}>
    <Spacer />
    <Text>{title}</Text>
  </View>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SectionHeader;
