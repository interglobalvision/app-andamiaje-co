import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ScrollView, View, Image, Dimensions, Text } from 'react-native';
import PortfolioItem from './PortfolioItem';

const ArtistaPortfolio = ({ portfolio }) => {
  if (portfolio === undefined)  return null;

  return (
    <View>
      <Text>Portafolio</Text>
     { portfolio.map( (item, key) => <PortfolioItem key={key} item={item} />)}
    </View>
  );
}

export default ArtistaPortfolio;
