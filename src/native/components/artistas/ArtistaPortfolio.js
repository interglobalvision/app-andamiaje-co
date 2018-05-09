import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, ScrollView, View, Image, Dimensions, Text } from 'react-native';
import PortfolioItem from './PortfolioItem';
import SectionHeader from '../SectionHeader';

const ArtistaPortfolio = ({ portfolio, name }) => {
  if (portfolio === undefined) return null;

  return (
    <View>
      <SectionHeader title="Portafolio" />
      <View>
        { portfolio.map((item, key) => <PortfolioItem key={key} item={item} name={name} />)}
      </View>
    </View>
  );
};

export default ArtistaPortfolio;
