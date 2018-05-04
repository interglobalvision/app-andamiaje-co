import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import DraftContentRenderer from '../DraftContentRenderer';

import CarouselHolder from '../carousel/CarouselHolder';

import styles from '../../constants/styles';

const LoteSingleObra = ({
  obra, border,
}) => {
  const {
    artista,
    title,
    year,
    materials,
    dimensions,
    notesRawContent,
  } = obra;

  const onPress = () => Actions.artista({ match: { params: { id: String(obra.artista.id) } } });

  const holderStyle = [styles.paddingBottomMid];
  if (border) {
    holderStyle.push(styles.bordered);
  }

  return (
    <View style={holderStyle}>
      <CarouselHolder obras={[obra]} />
      <View style={[styles.container, styles.paddingTopBasic]}>
        <TouchableOpacity
          onPress={onPress}
          style={[
            styles.paddingBottomSmall,
            styles.flexRow,
            { justifyContent: 'space-between' },
          ]}
        >
          <Text style={styles.fontBold}>{artista.name}</Text>
          <Text style={[styles.textLink, styles.fontSizeSmall]}>Ver bio</Text>
        </TouchableOpacity>
        <View>
          <Text style={[styles.lineHeightBasic]}><Text style={[styles.fontItalic, styles.lineHeightBasic]}>{title}</Text>, {year}</Text>
          <Text style={[styles.lineHeightBasic]}>{materials}</Text>
          <Text style={[styles.lineHeightBasic]}>{dimensions}</Text>
        </View>
        <View style={[styles.paddingTopBasic]}>
          <DraftContentRenderer rawContent={notesRawContent} />
        </View>
      </View>
    </View>
  );
};

LoteSingleObra.propTypes = {
  obra: PropTypes.object.isRequired,
};

export default LoteSingleObra;
