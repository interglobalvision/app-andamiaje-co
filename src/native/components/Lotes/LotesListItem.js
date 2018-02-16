import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Text, Button, List } from 'native-base';

import Spacer from '../Spacer';

import LotesCarousel from './LotesCarousel';
import LotesListItemObra from './LotesListItemObra';
//import SwiperItem from '../SwiperItem';

const LotesListItem = ({
  item,
}) => {

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  const styles = StyleSheet.create({
    bordered: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: 'black',
    }
  });

  return (
    <View style={styles.bordered}>
      <Spacer size={15} />
      <LotesCarousel obras={item.obras} />
      <Spacer size={15} />
      <Text style={{ fontWeight: '800' }}>{item.artista.name}</Text>
      <Spacer size={15} />
      <List>
        {item.obras.map(obra => <LotesListItemObra item={obra} key={keyExtractor(obra)} />)}
      </List>
      <Spacer size={15} />
    </View>
  );
};


LotesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesListItem;
