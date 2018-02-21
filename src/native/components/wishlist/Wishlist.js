import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { getLotes, setError } from '../../../actions/lotesActions';

import WishlistItem from './WishlistItem';

class Wishlist extends Component {
  static propTypes = {
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    getLotes: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchLotes = () => {
    return this.props.getLotes()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });

  }

  render = () => {
    const { wishlist } = this.props;
    const { loading, error, lotes } = this.props.lotes;

    const currentWishlist = lotes.filter(lote => wishlist.includes(lote.id));

    const keyExtractor = item => item.id;

    return (
      <View>
        <FlatList
          numColumns={1}
          data={currentWishlist}
          renderItem={({item}) => <WishlistItem item={item} />}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={this.fetchLotes}
            />
          }
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
});

const mapDispatchToProps = {
  getLotes,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
