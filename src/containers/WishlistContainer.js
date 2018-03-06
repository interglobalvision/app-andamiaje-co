import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { getLotes, setError } from '../actions/lotesActions';

class WishlistContainer extends Component {
  static propTypes = {
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    getLotes: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    activeLotes: PropTypes.array,
    // activeLotes prop passed from CatalogosContainer
    // to filter Lotes by Catalog in loteReducer
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => this.fetchLotes();

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
    const { Layout, lotes, wishlist, artistaId } = this.props;

    return (
      <Layout
        error={lotes.error}
        loading={lotes.loading}
        lotes={lotes.lotes}
        artistaId={artistaId}
        wishlist={wishlist}

        reFetch={() => this.fetchLotes()}
      />
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
  wishlist: state.member.wishlist,
});

const mapDispatchToProps = {
  getLotes,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistContainer);
