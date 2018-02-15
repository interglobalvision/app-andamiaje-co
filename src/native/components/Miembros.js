import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';
import DirectoryListItem from './DirectoryListItem';

const MiembrosList = ({
  error,
  loading,
  miembros,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.miembro({ match: { params: { id: String(item.id) } } });

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
          data={miembros}
          renderItem={({ item }) => (
            <DirectoryListItem name={item.displayName} images={item.images} />
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

MiembrosList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  miembros: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

MiembrosList.defaultProps = {
  error: null,
  reFetch: null,
};

export default MiembrosList;
