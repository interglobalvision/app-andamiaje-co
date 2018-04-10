import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getArtistas, setError } from '../actions/artistasActions';
import { getCatalogos, updateCountdown } from '../actions/catalogosActions';

class ArtistasContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    artistas: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      artistas: PropTypes.array.isRequired,
    }).isRequired,
    catalogos: PropTypes.shape({
      activeCatalogo: PropTypes.object.isRequired,
      countdown: PropTypes.object,
    }).isRequired,
    getArtistas: PropTypes.func.isRequired,
    getCatalogos: PropTypes.func.isRequired,
    updateCountdown: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchArtistas();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchArtistas = () => {
    return this.props.getArtistas()
      .then(() => this.fetchCatalogos())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  fetchCatalogos = () => {
    return this.props.getCatalogos()
      .then(() => this.props.updateCountdown())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, artistas, catalogos, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        artistaId={id}
        artistas={artistas.artistas}
        activeCatalogo={catalogos.activeCatalogo}
        countdown={catalogos.countdown}
        error={artistas.error}
        loading={artistas.loading}
        reFetch={() => this.fetchArtistas()}
      />
    );
  }
}

const mapStateToProps = state => ({
  artistas: state.artistas || {},
  catalogos: state.catalogos || {},
});

const mapDispatchToProps = {
  getArtistas,
  setError,
  getCatalogos,
  updateCountdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistasContainer);
