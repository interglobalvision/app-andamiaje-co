import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, RefreshControl, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _find from 'lodash/find';

import Loading from '../Loading';
import Error from '../Error';

import WishlistItem from './WishlistItem';

import styles from '../../constants/styles';

const WishlistList = ({
  loading,
  error,
  lotes,
  wishlist,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const currentWishlist = lotes.filter(lote => _find(wishlist, item => item.id === lote.id));

  if (currentWishlist.length) {
    return (
      <ScrollView style={styles.backgroundWhite}>
        <FlatList
          numColumns={1}
          data={currentWishlist}
          renderItem={({item}) => (<WishlistItem lote={item} />)}
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
  } else {
    return (
      <View style={[styles.flexCenter, styles.paddingTopLarge, styles.paddingBottomLarge]}>
        <Text>Parece que tu Wishlist está vacio</Text>
        <Text>Agrega Obras para guardar las que te gusta</Text>
      </View>
    )
  }
};

WishlistList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  lotes: PropTypes.array.isRequired,
  wishlist: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

WishlistList.defaultProps = {
  error: null,
  reFetch: null,
};

export default WishlistList;
