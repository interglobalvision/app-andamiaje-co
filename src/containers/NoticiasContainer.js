import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getNoticias, setError } from '../actions/noticiasActions';
import { getUser } from '../actions/member';

class NoticiasContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    noticias: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      noticias: PropTypes.array.isRequired,
    }).isRequired,
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
  getUser,
  getNoticias,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(NoticiasContainer);
