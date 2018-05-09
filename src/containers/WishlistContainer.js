import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { getLotes, setError as setLotesError } from '../actions/lotesActions';
import { getCatalogos, setError as setCatalogosError } from '../actions/catalogosActions';

class WishlistContainer extends Component {
  static propTypes = {
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    catalogos: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      activeCatalogo: PropTypes.object.isRequired,
    }).isRequired,
    getLotes: PropTypes.func.isRequired,
    setLotesError: PropTypes.func.isRequired,
    getCatalogos: PropTypes.func.isRequired,
    setCatalogosError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  componentDidMount = () => this.fetchLotesAndCatalogos();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchLotesAndCatalogos = () => this.props.getLotes()
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setLotesError(err);
    })
    .then(this.props.getCatalogos)
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setCatalogosError(err);
    })

  render = () => {
    const {
      Layout, lotes, wishlist, artistaId, countdown,
    } = this.props;
    const { activeCatalogo } = this.props.catalogos;

    const loading = !!(this.props.lotes.loading || this.props.catalogos.loading);

    let error = null;

    if (this.props.lotes.error !== null) {
      error = this.props.lotes.error;
    }

    if (this.props.catalogos.error !== null) {
      error = this.props.catalogos.error;
    }

    return (
      <Layout
        error={error}
        loading={lotes.loading}
        lotes={lotes.lotes}
        artistaId={artistaId}
        wishlist={wishlist}
        activeCatalogo={activeCatalogo}
        countdown={countdown}
        reFetch={() => this.fetchLotesAndCatalogos()}
      />
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
  wishlist: state.member.wishlist,
  catalogos: state.catalogos || {},
  countdown: state.countdown || {},
});

const mapDispatchToProps = {
  getLotes,
  setLotesError,
  getCatalogos,
  setCatalogosError,
};

export default connect(mapStateToProps, mapDispatchToProps)(WishlistContainer);
