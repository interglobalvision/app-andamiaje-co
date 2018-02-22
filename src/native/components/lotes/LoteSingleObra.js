import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

import Spacer from '../Spacer';

import CarouselHolder from '../carousel/CarouselHolder';

const LoteSingleObra = ({
  obra,
}) => {

  return (
    <View>
      <CarouselHolder obras={[obra]} />
      <Spacer />
      <View>
        <Text style={{ fontWeight: '800' }}>{obra.artista.name}</Text>
        <Spacer />
        <Text>{obra.title}, {obra.year}</Text>
        <Text>{obra.materials}</Text>
        <Text>{obra.dimensions}</Text>
      </View>
      <Spacer />
    </View>
  );
};

LoteSingleObra.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default LoteSingleObra;
