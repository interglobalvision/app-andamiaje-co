import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer';

import CarouselHolder from '../carousel/CarouselHolder';

import styles from '../../constants/styles';

const LoteSingleObra = ({
  obra,
}) => {

  const onPress = () => Actions.artista({ match: { params: { id: String(obra.artista.id) } } });

  return (
    <View style={[styles.paddingBottomLarge, styles.bordered]}>
      <CarouselHolder obras={[obra]} />
      <View style={[styles.container, styles.paddingTopBasic]}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.paddingBottomBasic,
            styles.flexRow,
            { justifyContent: 'space-between' }
          ]}
        >
          <Text style={styles.fontBold}>{obra.artista.name}</Text>
          <Text>Ver bio</Text>
        </TouchableOpacity>
        <View>
          <Text><Text style={[styles.fontItalic]}>{obra.title}</Text>, {obra.year}</Text>
          <Text>{obra.materials}</Text>
          <Text>{obra.dimensions}</Text>
        </View>
      </View>
    </View>
  );
};

LoteSingleObra.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default LoteSingleObra;
