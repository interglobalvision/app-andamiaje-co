import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Card, CardItem, Body, Text, Button } from 'native-base';

import Spacer from '../Spacer';

import LotesListItemObra from './LotesListItemObra';

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

  // return Obra details in list item
  _renderObra = ({ item }) => (
    <View>
      <Text>{item.title}, {item.year}</Text>
      <Text>{item.medium}</Text>
    </View>
  );

  return (
    <View style={styles.bordered}>
      <Card transparent style={{ paddingHorizontal: 6 }}>
        <CardItem cardBody>
          <Body>
            <Spacer size={15} />
            <Text style={{ fontWeight: '800' }}>{item.artista.name}</Text>
            <Spacer size={15} />
            <FlatList
              numColumns={1}
              data={item.obras}
              renderItem={LotesListItemObra}
              keyExtractor={keyExtractor}
            />
            <Spacer size={15} />
          </Body>
        </CardItem>
      </Card>
    </View>
  );
};


LotesListItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default LotesListItem;
