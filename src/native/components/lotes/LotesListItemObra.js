import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Spacer from '../Spacer';

const LotesListItemObra = ({
  obra,
}) => {

  return (
    <View>
      <Text>{obra.title}, {obra.year}</Text>
      <Text>{obra.materials}</Text>
      <Spacer size={5} />
    </View>
  );
};

LotesListItemObra.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default LotesListItemObra;
