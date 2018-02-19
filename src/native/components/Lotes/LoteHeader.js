import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Spacer from '../Spacer';

const LoteHeader = ({
  obrasLength,
  price,
  isWishlist,
}) => {

  const addToWishlist = item => {
    console.log('add');
  };
  const removeFromWishlist = item => {
    console.log('remove');
  };

  return (
    <View>
      <Spacer />
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <Text>{ obrasLength }</Text>
          <Text>  •  </Text>
          <Text>ŧ { price }</Text>
        </View>
        <View>
          { isWishlist ? <Text onPress={ () => removeFromWishlist() }>Remove from wishlist</Text>
            : <Text onPress={ () => addToWishlist() }>Add to wishlist</Text> }
        </View>
      </View>
      <Spacer />
    </View>
  );
};

LoteHeader.propTypes = {
  obrasLength: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  isWishlist: PropTypes.bool.isRequired,
};

export default LoteHeader;
