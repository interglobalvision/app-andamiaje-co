import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer';

const LotesGridItem = ({
  item,
}) => {

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  let { width } = Dimensions.get('window');

  let imageSource = require('../../../images/placeholder.png');

  if (item.obras[0].images !== undefined) {
    imageSource = {uri: item.obras[0].images[0].downloadURL};
  }

  return (
    <TouchableOpacity style={{
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'white',
    }}
    onPress={() => onPress(item)}
    >
      <Image source={imageSource} style={{ width: (width / 3), height: (width / 3) }}/>
    </TouchableOpacity>
  );
};

LotesGridItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesGridItem;
