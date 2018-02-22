import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel-improved';
import styles from '../../constants/styles';

import CarouselItem from './CarouselItem';

const CarouselHolder = ({
  obras,
}) => {
  const keyExtractor = item => item.key;

  let { width } = Dimensions.get('window');

  let carouselImages = [];

  obras.forEach((obra) => {
    obra.images.forEach((image) => {
      carouselImages.push(image);
    });
  });

  const bullets = carouselImages.length > 1 ? true : false;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        delay={2000}
        style={{width: width, height: width}}
        autoplay={false}
        bullets={bullets}
        isLooped={false}
        bulletStyle={{ borderColor: 'black' }}
        chosenBulletStyle={{ backgroundColor: 'black' }}
      >
        {carouselImages.map(image => <CarouselItem image={image} key={keyExtractor(image)}/>)}
      </Carousel>
    </View>
  );
};

CarouselHolder.propTypes = {
  obras: PropTypes.array.isRequired,
};

export default CarouselHolder;
