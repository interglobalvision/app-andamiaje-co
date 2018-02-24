import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, StyleSheet, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Container, Content } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles from '../../constants/styles';

import Loading from '../Loading';
import Error from '../Error';
import DirectoryListItem from '../DirectoryListItem';

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

  return (
    <ScrollView style={styles.backgroundWhite}>
      <FlatList
        numColumns={1}
        data={miembros}
        renderItem={({ item }) => (
          <DirectoryListItem id={item.id} name={item.displayName} images={item.images} type={'miembro'} />
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
