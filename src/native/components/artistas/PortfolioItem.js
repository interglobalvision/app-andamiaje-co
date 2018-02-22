import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer';

import CarouselHolder from '../carousel/CarouselHolder';

const PortfolioItem = ({
  item,
}) => {

  return (
    <View>
      <CarouselHolder obras={[item]} />
      <Spacer />
      <View>
        <Text>{item.title}, {item.year}</Text>
        <Text>{item.materials}</Text>
        <Spacer size={5} />
      </View>
      <Spacer />
    </View>
  );
};

PortfolioItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PortfolioItem;
