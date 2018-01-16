import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNoticias, setError } from '../actions/noticiasActions';

class NoticiaListing extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    noticias: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      noticias: PropTypes.array.isRequired,
    }).isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({}),
    }),
    getNoticias: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  static defaultProps = {
    match: null,
  }

  componentDidMount = () => this.fetchNoticias();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchNoticias = () => {
    console.log('CONTAINER', this.props);
    return this.props.getNoticias()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });

  }

  render = () => {
    const { Layout, noticias, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    return (
      <Layout
        noticiaId={id}
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

export default connect(mapStateToProps, mapDispatchToProps)(NoticiaListing);
