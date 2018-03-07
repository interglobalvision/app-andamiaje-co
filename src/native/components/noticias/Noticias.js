import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, ScrollView, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import CatalogosContainer from '../../../containers/CatalogosContainer';
import Calendar from '../calendar/Calendar';

import Loading from '../Loading';
import Error from '../Error';
import Header from '../Header';
import Spacer from '../Spacer';
import SectionHeader from '../SectionHeader';

import InlineVideo from '../InlineVideo';

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

      <InlineVideo />

      <SectionHeader title={'Noticias'} />

      <View>
        {noticias.map( (item, key) => {
          let border = true;
          if (key >= (noticias.length - 1) ) {
            border = false;
          }
          return (
            <NoticiaItem key={keyExtractor(item)} item={item} border={border}/>
          )
        })}
      </View>

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
