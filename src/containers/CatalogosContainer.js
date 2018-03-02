import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCatalogos, setError } from '../actions/catalogosActions';
import { updateCountdown } from '../actions/catalogosActions';

class CatalogosContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    catalogos: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      activeCatalogo: PropTypes.object.isRequired,
      pastCatalogos: PropTypes.array.isRequired,
    }).isRequired,
    getCatalogos: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchCatalogos();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchCatalogos = () => {
    return this.props.getCatalogos()
      .then(() => this.props.updateCountdown())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  render = () => {
    const { Layout, catalogos } = this.props;

    return (
      <Layout
        error={catalogos.error}
        loading={catalogos.loading}
        activeCatalogo={catalogos.activeCatalogo}
        pastCatalogos={catalogos.pastCatalogos}
        futureCatalogos={catalogos.futureCatalogos}
        countdown={catalogos.countdown}
        reFetch={() => this.fetchCatalogos()}
      />
    );
  }
}

const mapStateToProps = state => ({
  catalogos: state.catalogos || {},
});

const mapDispatchToProps = {
  getCatalogos,
  setError,
  updateCountdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogosContainer);
