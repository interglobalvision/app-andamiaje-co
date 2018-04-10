import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNoticias, setError } from '../actions/noticiasActions';
import { getUser } from '../actions/member';
import { getCatalogos, updateCountdown } from '../actions/catalogosActions';

class NoticiasContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    noticias: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      noticias: PropTypes.array.isRequired,
    }).isRequired,
    catalogos: PropTypes.shape({
      activeCatalogo: PropTypes.object.isRequired,
      countdown: PropTypes.object,
    }).isRequired,
    countdown: PropTypes.object,
    getUser: PropTypes.func.isRequired,
    getNoticias: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    this.fetchUser();
    //this.fetchNoticias();
  }

  fetchUser = () => {
    return this.props.getUser()
      .then(() => this.fetchNoticias())
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  fetchNoticias = () => {
    return this.props.getNoticias()
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
    const { Layout, noticias, catalogos } = this.props;

    return (
      <Layout
        error={noticias.error}
        loading={noticias.loading}
        noticias={noticias.noticias}
        activeCatalogo={catalogos.activeCatalogo}
        countdown={catalogos.countdown}
        reFetch={() => this.fetchNoticias()}
      />
    );
  }
}

const mapStateToProps = state => ({
  noticias: state.noticias || {},
  catalogos: state.catalogos || {},
});

const mapDispatchToProps = {
  getUser,
  getNoticias,
  getCatalogos,
  updateCountdown,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticiasContainer);
