import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';
import Spacer from '../Spacer';
import ArtistasListItem from './ArtistasListItem';

const ArtistasList = ({
  error,
  loading,
  artistas,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  return (
    <ScrollView>
      <FlatList
        numColumns={1}
        data={artistas}
        renderItem={({ item }) => (
          <ArtistasListItem id={item.id} name={item.name} images={item.images} />
        )}
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

ArtistasList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  artistas: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

ArtistasList.defaultProps = {
  error: null,
  reFetch: null,
};

export default ArtistasList;
