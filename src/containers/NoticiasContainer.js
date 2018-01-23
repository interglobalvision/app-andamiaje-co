import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNoticias, setError } from '../actions/noticiasActions';

class NoticiasContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    noticias: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      noticias: PropTypes.array.isRequired,
    }).isRequired,
    getNoticias: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchNoticias();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchNoticias = () => {
    return this.props.getNoticias()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });

  }

  render = () => {
    const { Layout, noticias } = this.props;

    return (
      <Layout
        error={noticias.error}
        loading={noticias.loading}
        noticias={noticias.noticias}
        reFetch={() => this.fetchNoticias()}
      />
    );
  }
}

const mapStateToProps = state => ({
  noticias: state.noticias || {},
});

const mapDispatchToProps = {
  getNoticias,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticiasContainer);
