import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Text } from 'native-base';

import Spacer from '../Spacer';

const LoteHeader = ({
  obrasLength,
  price,
  wishlist,
}) => {

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
          <Text>{ wishlist ? '√' : 'X' }</Text>
        </View>
      </View>
      <Spacer />
    </View>
  );
};

LoteHeader.propTypes = {
  obrasLength: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  wishlist: PropTypes.bool.isRequired,
};

export default LoteHeader;
