import React from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Hyperlink from 'react-native-hyperlink';

import styles from '../../constants/styles';

import CarouselHolder from '../carousel/CarouselHolder';

const PortfolioItem = ({
  item,
  name,
}) => (
  <View style={[styles.bordered, styles.paddingTopBasic, styles.paddingBottomLarge]}>
    <CarouselHolder obras={[item]} />
    <View style={[styles.container]}>
      <View style={[styles.paddingBottomSmall]}>
        <Text style={[styles.fontBold]}>{name}</Text>
      </View>
      <View>
        <Text style={[styles.lineHeightBasic]}><Text style={[styles.fontItalic]}>{item.title}</Text>, {item.year}</Text>
        {(item.materials !== undefined && item.materials !== '') &&
        <Text style={[styles.lineHeightBasic]}>{item.materials}</Text>
          }
        {(item.dimensions !== undefined && item.dimensions !== '') &&
        <Text style={[styles.lineHeightBasic]}>{item.dimensions}</Text>
          }
      </View>
      {(item.notes !== undefined && item.notes !== '') &&
      <View style={[
            styles.paddingTopBasic,
          ]}
      >
        <Hyperlink linkDefault linkStyle={styles.textLink}>
          <Text style={[styles.lineHeightBasic]}>{item.notes}</Text>
        </Hyperlink>
      </View>
        }
    </View>
  </View>
);

PortfolioItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PortfolioItem;
