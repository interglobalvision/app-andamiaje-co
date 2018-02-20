import React from 'react';
import PropTypes from 'prop-types';
import { Image, View } from 'react-native';
import Carousel from 'react-native-looped-carousel-improved';

import Spacer from '../Spacer';

import CarouselItem from './CarouselItem';

const LotesCarousel = ({
  obras,
}) => {
  const keyExtractor = item => item.id;

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        delay={2000}
        style={{width: 300, height: 300}}
        autoplay={false}
        bullets={true}
        isLooped={false}
      >
        {obras.map(obra => <CarouselItem obra={obra} key={keyExtractor(obra)}/>)}
      </Carousel>
    </View>
  );
};

LotesCarousel.propTypes = {
  obras: PropTypes.array.isRequired,
};

export default LotesCarousel;
