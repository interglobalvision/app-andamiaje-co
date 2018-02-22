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
  item,
}) => {

  const keyExtractor = item => item.id;

  const onPress = id => Actions.lote({ match: { params: { id: String(id) } } });

  return (
    <View>
      <LoteHeader obrasLength={item.obras.length} price={item.price} lote={item} />
      <CarouselHolder obras={item.obras} />
      <Spacer />
      <TouchableOpacity onPress={() => onPress(item.id)}>
        <Text style={{ fontWeight: '800' }}>{item.artista.name}</Text>
        <Spacer />
        <List>
          {item.obras.map(obra => <LotesListItemObra item={obra} key={keyExtractor(obra)} />)}
        </List>
        <Spacer />
        <Text>Ver más</Text>
        <Spacer />
      </TouchableOpacity>
    </View>
  );
};

LotesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesListItem;
