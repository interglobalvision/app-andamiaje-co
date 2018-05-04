import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import styles from '../../constants/styles';

const LotesListItemObra = ({
  obra, border,
}) => (
  <View style={styles.paddingBottomSmall}>
    <Text style={[{ color: 'black' }]}><Text style={[styles.fontItalic, { color: 'black' }]}>{obra.title}</Text>, {obra.year}</Text>
    <Text style={[{ color: 'black' }]}>{obra.materials}</Text>
  </View>
);

LotesListItemObra.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default LotesListItemObra;
