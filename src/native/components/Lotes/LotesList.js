import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, RefreshControl, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';

import LotesListItem from './LotesListItem';

export default class LotesList extends React.Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    lotes: PropTypes.array.isRequired,
    reFetch: PropTypes.func,
  };

  static defaultProps = {
    error: null,
    reFetch: null,
  };

  constructor(props) {
    super(props);
  }

  keyExtractor = item => item.id;

  onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

  render() {
    const { loading, error, reFetch, lotes } = this.props;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    return (
      <FlatList
        numColumns={1}
        data={lotes}
        renderItem={LotesListItem}
        keyExtractor={this.keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={reFetch}
          />
        }
      />
    );
  }
}
