import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Spacer from '../Spacer';

import CarouselHolder from '../carousel/CarouselHolder';
import LotesListItemObra from './LotesListItemObra';
import LoteHeader from './LoteHeader';

const LotesListItem = ({
  lote,
}) => {

  const keyExtractor = item => item.id;

  const onPress = id => Actions.lote({ match: { params: { id: String(id) } } });

  return (
    <View>
      <LoteHeader lote={lote} />
      <CarouselHolder obras={lote.obras} />
      <Spacer />
      <TouchableOpacity onPress={() => onPress(lote.id)}>
        <Text style={{ fontWeight: '800' }}>{lote.artista.name}</Text>
        <Spacer />
        <FlatList
          numColumns={1}
          data={lote.obras}
          renderItem={({item}) => (<LotesListItemObra obra={item} />)}
          keyExtractor={keyExtractor}
        />
        <Spacer />
        <Text>Ver más</Text>
        <Spacer />
      </TouchableOpacity>
    </View>
  );
};

LotesListItem.propTypes = {
  lote: PropTypes.object.isRequired,
};

export default LotesListItem;
