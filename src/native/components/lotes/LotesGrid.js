import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, View, Text } from 'react-native';

import Loading from '../Loading';
import Error from '../Error';

import LotesGridItem from './LotesGridItem';

const LotesGrid = ({
  loading,
  error,
  lotes,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

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
  reFetch: PropTypes.func,
};

LotesGrid.defaultProps = {
  error: null,
  reFetch: null,
};

export default LotesGrid;
