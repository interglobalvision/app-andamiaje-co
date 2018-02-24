import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import styles from '../../constants/styles';

import CarouselHolder from '../carousel/CarouselHolder';

const PortfolioItem = ({
  item,
  name,
}) => {

  return (
    <View style={[styles.bordered, styles.paddingTopBasic, styles.paddingBottomLarge]}>
      <CarouselHolder obras={[item]} />
      <View style={[styles.container, styles.paddingTopSmall]}>
        <View style={[styles.paddingBottomSmall]}>
          <Text style={[styles.fontBold]}>{name}</Text>
        </View>
        <View>
          <Text><Text style={[styles.fontItalic]}>{item.title}</Text>, {item.year}</Text>
          <Text>{item.materials}</Text>
          <Text>{item.dimensions}</Text>
        </View>
      </View>
    </View>
  );
};

PortfolioItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PortfolioItem;
