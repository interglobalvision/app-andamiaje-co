import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Dimensions } from 'react-native';
import Carousel from 'react-native-looped-carousel-improved';
import styleConstants from '../../constants/styleConstants';
import styles from '../../constants/styles';

import CarouselItem from './CarouselItem';

const CarouselHolder = ({
  obras,
}) => {
  const keyExtractor = item => item.key;

  let carouselImages = [];

  obras.forEach((obra) => {
    obra.images.forEach((image) => {
      carouselImages.push(image);
    });
  });

  const showBullets = carouselImages.length > 1 ? true : false;
  const bulletDiameter = 5;

  return (
    <View style={styles.backgroundWhite}>
      <Carousel
        delay={2000}
        style={styles.carousel}
        autoplay={false}
        bullets={showBullets}
        bulletsContainerStyle={styles.carouselBulletsContainer}
        isLooped={false}
        bulletStyle={styles.carouselBulletStyle}
        chosenBulletStyle={styles.carouselChosenBulletStyle}
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
