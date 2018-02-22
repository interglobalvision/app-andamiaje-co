import React from 'react';
import { Image, View, StyleSheet, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { getResizedImageUrl, getBestImageSize, getScaledImageDimensions } from '../../../lib/utilities';
import styles from '../../constants/styles';

const CarouselItem = ({
  image,
}) => {
  let windowWidth = Dimensions.get('window').width;

  const imageSize = getBestImageSize();

  const imageSrc = getResizedImageUrl(image, imageSize);

  const imageDimensions = getScaledImageDimensions(image.width, image.height);

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      width: windowWidth,
      height: windowWidth,
      backgroundColor: 'white',
    },
    image: {
      width: imageDimensions.width,
      height: imageDimensions.height
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: imageSrc, cache: 'force-cache' }}
        style={styles.image}
      />
    </View>
  );
};

CarouselItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default CarouselItem;
