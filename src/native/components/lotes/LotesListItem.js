import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import CarouselHolder from '../carousel/CarouselHolder';
import LotesListItemObra from './LotesListItemObra';
import LoteHeader from './LoteHeader';

import styles from '../../constants/styles';

const LotesListItem = ({
  lote,
}) => {

  const keyExtractor = item => item.id;

  const onPress = id => Actions.lote({ match: { params: { id: String(id) } } });

  return (
    <View style={[styles.bordered]}>
      <LoteHeader lote={lote} bordered={true} />
      <CarouselHolder obras={lote.obras} />
      <TouchableOpacity style={styles.container} onPress={() => onPress(lote.id)}>
        <View style={[styles.paddingTopBasic, styles.paddingBottomSmall]}>
          <Text style={styles.fontBold}>{lote.artista.name}</Text>
        </View>
        <FlatList
          numColumns={1}
          data={lote.obras}
          renderItem={({item}) => (<LotesListItemObra obra={item} />)}
          keyExtractor={keyExtractor}
        />
        <View style={[styles.paddingTopSmall, styles.paddingBottomLarge]}>
          <Text>Ver más</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

LotesListItem.propTypes = {
  lote: PropTypes.object.isRequired,
};

export default LotesListItem;
