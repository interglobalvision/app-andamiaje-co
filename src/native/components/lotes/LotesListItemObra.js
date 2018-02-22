import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import styles from '../../constants/styles';

const LotesListItemObra = ({
  obra,
}) => {

  return (
    <View style={styles.paddingBottomSmall}>
      <Text>{obra.title}, {obra.year}</Text>
      <Text>{obra.materials}</Text>
    </View>
  );
};

LotesListItemObra.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default LotesListItemObra;
