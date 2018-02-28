import React from 'react';
import { ScrollView, Image, View, Dimensions } from 'react-native';
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

  return (
    <ScrollView
      scrollEnabled={false}
      minimumZoomScale={1}
      maximumZoomScale={1.000000000000001}
      bouncesZoom={true}
      pinchGestureEnabled={true}
      contentContainerStyle={styles.carouselItem}>
      <Image
        source={{ uri: imageSrc, cache: 'force-cache' }}
        style={{
          width: imageDimensions.width,
          height: imageDimensions.height
        }}
      />
    </ScrollView>
  );
};

CarouselItem.propTypes = {
  image: PropTypes.object.isRequired,
};

export default CarouselItem;
