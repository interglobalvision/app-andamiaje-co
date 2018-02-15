import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMiembros, setError } from '../actions/miembrosActions';

class MiembrosContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    miembros: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      miembros: PropTypes.array.isRequired,
    }).isRequired,
    getMiembros: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchMiembros();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchMiembros = () => {
    return this.props.getMiembros()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });

  }

  render = () => {
    const { Layout, miembros } = this.props;

    return (
      <Layout
        error={miembros.error}
        loading={miembros.loading}
        miembros={miembros.miembros}
        reFetch={() => this.fetchMiembros()}
      />
    );
  }
}

const mapStateToProps = state => ({
  miembros: state.miembros || {},
});

const mapDispatchToProps = {
  getMiembros,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(MiembrosContainer);
