import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getArtistas, setError } from '../actions/artistasActions';

class ArtistasContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func.isRequired,
    artistas: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      artistas: PropTypes.array.isRequired,
    }).isRequired,
    getArtistas: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  }

  componentDidMount = () => this.fetchArtistas();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchArtistas = () => {
    return this.props.getArtistas()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });

  }

  render = () => {
    const { Layout, artistas } = this.props;

    return (
      <Layout
        error={artistas.error}
        loading={artistas.loading}
        artistas={artistas.artistas}
        reFetch={() => this.fetchArtistas()}
      />
    );
  }
}

const mapStateToProps = state => ({
  artistas: state.artistas || {},
});

const mapDispatchToProps = {
  getArtistas,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArtistasContainer);
