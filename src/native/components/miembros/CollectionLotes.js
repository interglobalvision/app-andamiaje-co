import React from 'react';
import { View } from 'react-native';
import _filter from 'lodash/filter';

import LotesListItem from '../lotes/LotesListItem';
import Loading from '../Loading';
import Error from '../Error';

const CollectionLotes = ({
  loading,
  error,
  lotes,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  return (
    <View>
      { lotes.map( (item, key) => <LotesListItem key={key} lote={item} displayOnly={true} />) }
    </View>
  );
};

export default CollectionLotes;
