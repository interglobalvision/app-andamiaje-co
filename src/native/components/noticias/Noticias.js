import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

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
    <Container>
      <Content padder>
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
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />

        <Spacer size={20} />
      </Content>
    </Container>
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
