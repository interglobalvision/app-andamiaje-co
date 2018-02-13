import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList, ListItem, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Error from './Error';
import Spacer from './Spacer';

const LotesList = ({
  error,
  loading,
  lotes,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

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

  // return Lote list item
  _renderLote = ({ item }) => (
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
              renderItem={this._renderObra}
              keyExtractor={keyExtractor}
            />
            <Spacer size={15} />
          </Body>
        </CardItem>
      </Card>
    </View>
  );

  return (
    <FlatList
      numColumns={1}
      data={lotes}
      renderItem={this._renderLote}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={reFetch}
        />
      }
    />
  );
};

LotesList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  lotes: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

LotesList.defaultProps = {
  error: null,
  reFetch: null,
};

export default LotesList;
