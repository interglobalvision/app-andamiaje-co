import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import CatalogosContainer from '../../../containers/CatalogosContainer';
import Calendar from '../calendar/Calendar';

import Loading from '../Loading';
import Error from '../Error';
import Header from '../Header';
import Spacer from '../Spacer';

import NoticiaItem from './NoticiaItem';

const Noticias = ({
  error,
  loading,
  noticias,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.noticia({ match: { params: { id: String(item.id) } } });

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={reFetch}
        />
      }
    >
      <CatalogosContainer Layout={Calendar} />

      <Header
        title="Noticias"
      />

      <FlatList
        numColumns={1}
        data={noticias}
        renderItem={({ item }) => (
         <NoticiaItem item={item} />
        )}
        keyExtractor={keyExtractor}
      />

      <Spacer size={20} />
    </ScrollView>
  );
};

Noticias.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  noticias: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

Noticias.defaultProps = {
  error: null,
  reFetch: null,
};

export default Noticias;
