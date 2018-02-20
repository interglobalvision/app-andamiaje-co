import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';

import LotesGridItem from './LotesGridItem';

const LotesGrid = ({
  loading,
  error,
  lotes,
  filterBy,
  orderBy,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  return (
    <FlatList
      numColumns={3}
      data={lotes}
      renderItem={LotesGridItem}
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

LotesGrid.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  lotes: PropTypes.array.isRequired,
  filterBy: PropTypes.string,
  orderBy: PropTypes.string,
  reFetch: PropTypes.func,
};

LotesGrid.defaultProps = {
  error: null,
  reFetch: null,
};

export default LotesGrid;
