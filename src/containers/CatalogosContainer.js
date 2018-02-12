import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCatalogos, setError } from '../actions/catalogosActions';

class CatalogosContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    catalogos: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      catalogos: PropTypes.array.isRequired,
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
        catalogos={catalogos.catalogos}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogosContainer);
