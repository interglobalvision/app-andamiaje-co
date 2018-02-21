import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';

import WishlistItem from './WishlistItem';

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

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  const currentWishlist = lotes.filter(lote => wishlist.includes(lote.id));

  return (
    <FlatList
      numColumns={1}
      data={currentWishlist}
      renderItem={({item}) => (<WishlistItem item={item} />)}
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
