import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { List } from 'native-base';

import Spacer from '../Spacer';

import LoteSingleObra from './LoteSingleObra';
import LoteHeader from './LoteHeader';

const LoteSingle = ({
  lote,
  obras,
  error,
  loading,
  reFetch,
}) => {

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  const loteObras = obras.filter( obra => {
    return lote.obras.some( loteObra => {
      return loteObra.id === obra.id;
    });
  });

  return (
    <ScrollView>
      <LoteHeader loteId={lote.id} obrasLength={lote.obras.length} price={lote.price} />
      <FlatList
        numColumns={1}
        data={loteObras}
        renderItem={({item}) => (<LoteSingleObra obra={item} />)}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={reFetch}
          />
        }
      />
    </ScrollView>
  );
};

LoteSingle.propTypes = {
  lote: PropTypes.object.isRequired,
  obras: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  reFetch: PropTypes.func,
};

export default LoteSingle;
