import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { List } from 'native-base';

import Spacer from '../Spacer';

import LotesCarousel from './LotesCarousel';
import LotesListItemObra from './LotesListItemObra';
import LoteHeader from './LoteHeader';

const LotesListItem = ({
  item,
}) => {

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  return (
    <View>
      <LoteHeader loteId={item.id} obrasLength={item.obras.length} price={item.price} />
      <LotesCarousel obras={item.obras} />
      <Spacer />
      <Text style={{ fontWeight: '800' }}>{item.artista.name}</Text>
      <Spacer />
      <List>
        {item.obras.map(obra => <LotesListItemObra item={obra} key={keyExtractor(obra)} />)}
      </List>
      <Spacer />
      <Text>Ver más</Text>
      <Spacer />
    </View>
  );
};

LotesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesListItem;
