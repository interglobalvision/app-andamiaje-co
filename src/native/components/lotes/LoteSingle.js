import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';

import Loading from '../Loading';
import Error from '../Error';
import Spacer from '../Spacer';

import LoteSingleObra from './LoteSingleObra';
import LoteHeader from './LoteHeader';

const LoteSingle = ({
  lote,
  obras,
  error,
  loading,
}) => {

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const loteObras = obras.filter( obra => {
    return lote.obras.some( loteObra => {
      return loteObra.id === obra.id;
    });
  });

  return (
    <ScrollView stickyHeaderIndices={[0]} style={styles.backgroundWhite}>
      <LoteHeader lote={lote} />
      <View>
        {loteObras.map( (item, key) => {
          let border = true;
          if (key >= (loteObras.length - 1) ) {
            border = false;
          }
          return (
            <LoteSingleObra key={key} obra={item} border={border}/>
          )
        })}
      </View>
    </ScrollView>
  );
};

LoteSingle.propTypes = {
  lote: PropTypes.object.isRequired,
  obras: PropTypes.array.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default LoteSingle;
