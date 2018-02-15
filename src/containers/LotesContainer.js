import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import LotesList from '../native/components/Lotes/LotesList';

import { getLotes, setError } from '../actions/lotesActions';

class LotesContainer extends Component {
  static propTypes = {
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    getLotes: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    activeLotes: PropTypes.array,
    // activeLotes prop passed from CatalogosContainer
    // to filter Lotes by Catalog in loteReducer
  }

  componentDidMount = () => this.fetchLotes();

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchLotes = () => {
    return this.props.getLotes()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });

  }

  render = () => {
    const { lotes } = this.props;

    return (
      <LotesList
        error={lotes.error}
        loading={lotes.loading}
        lotes={lotes.lotes}
        reFetch={() => this.fetchLotes()}
      />
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
});

const mapDispatchToProps = {
  getLotes,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LotesContainer);
