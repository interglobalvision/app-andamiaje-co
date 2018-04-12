import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUser} from '../actions/member';
import { getCatalogos, setError } from '../actions/catalogosActions';
import { updateCountdown } from '../actions/countdownActions';

class CatalogosContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    catalogos: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      activeCatalogo: PropTypes.object.isRequired,
      pastCatalogos: PropTypes.array.isRequired,
    }).isRequired,
    countdown: PropTypes.object,
    getUser: PropTypes.func.isRequired,
    getCatalogos: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.fetchUser();
  }

  fetchUser = () => {
    return this.props.getUser()
      .then(() => this.fetchCatalogos())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

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
    const { Layout, catalogos, countdown } = this.props;

    return (
      <Layout
        error={catalogos.error}
        loading={catalogos.loading}
        activeCatalogo={catalogos.activeCatalogo}
        pastCatalogos={catalogos.pastCatalogos}
        futureCatalogos={catalogos.futureCatalogos}
        countdown={countdown}
        reFetch={() => this.fetchCatalogos()}
      />
    );
  }
}

const mapStateToProps = state => ({
  catalogos: state.catalogos || {},
  countdown: state.countdown || {},
});

const mapDispatchToProps = {
  getUser,
  getCatalogos,
  setError,
  updateCountdown,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogosContainer);
