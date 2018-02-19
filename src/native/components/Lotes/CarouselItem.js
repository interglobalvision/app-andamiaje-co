import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';

const CarouselItem = ({
  obra,
}) => {
  const keyExtractor = item => item.id;

  if (obra.images !== undefined && obra.images !== null) {
    return (
      <View style={{ width: 300, height: 300 }}>
        <Image source={{ uri: obra.images[0].downloadURL}} style={{ width: 300, height: 300 }}/>
      </View>
    );
  } else {
    return null;
  }
};

CarouselItem.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default CarouselItem;
