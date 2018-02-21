import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Error from './Error';
import Spacer from './Spacer';
import DirectoryListItem from './DirectoryListItem';

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

  const styles = StyleSheet.create({
    bordered: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: 'black',
    }
  });

  return (
    <Container>
      <Content padder>
        <FlatList
          numColumns={1}
          data={artistas}
          renderItem={({ item }) => (
            <DirectoryListItem id={item.id} name={item.name} images={item.images} />
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
