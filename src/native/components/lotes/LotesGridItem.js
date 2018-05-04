import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Image, View, Text, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl, getBestImageSize } from '../../../lib/utilities';

import Spacer from '../Spacer';

const LotesGridItem = ({
  item,
}) => {
  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  const { width } = Dimensions.get('window');
  const thirdWidth = width / 3;

  let imageSrc = require('../../../images/placeholder.png');

  if (item.obras[0].images !== undefined) {
    const imageSize = getBestImageSize(thirdWidth);
    imageSrc = getResizedImageUrl(item.obras[0].images[0], imageSize);
  }

  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <Image source={{ uri: imageSrc, cache: 'force-cache' }} style={{ width: thirdWidth, height: thirdWidth }} />
      {item.owner !== undefined &&
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          backgroundColor: 'rgba(30,30,30,.4)',
        }}
        >
          <View style={{
            position: 'absolute',
            width: '150%',
            top: '50%',
            left: '-25%',
            borderTopWidth: 2,
            borderTopColor: 'rgba(30,30,30,1)',
            transform: [{ rotate: '25deg' }],
          }}
          />
        </View>
      }
    </TouchableOpacity>
  );
};

LotesGridItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesGridItem;
