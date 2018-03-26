import React from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';
import _filter from 'lodash/filter';
import _find from 'lodash/find';

import LotesListItem from '../lotes/LotesListItem';
import Loading from '../Loading';
import Error from '../Error';

const CollectionLotes = ({
  loading,
  error,
  lotes,
  collection,
  reFetch,
}) => {

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Filter lotes that are in the collection
  const collectionLotes = _filter(lotes, lote => {
    return collection[lote.id] !== undefined ? true : false;
  });

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  return (
    <FlatList
      numColumns={1}
      data={collectionLotes}
      renderItem={({item}) => <LotesListItem lote={item} displayOnly={true} />}
      keyExtractor={keyExtractor}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={reFetch}
        />
      }
    />
  );

}

export default CollectionLotes;
