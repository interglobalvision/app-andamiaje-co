import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Spacer from '../Spacer';

const LotesListItemObra = ({
  item,
}) => {

  return (
    <View>
      <Text>{item.title}, {item.year}</Text>
      <Text>{item.materials}</Text>
      <Spacer size={5} />
    </View>
  );
};

LotesListItemObra.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesListItemObra;
