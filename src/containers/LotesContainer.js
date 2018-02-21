import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import LotesList from '../native/components/lotes/LotesList';
import LotesGrid from '../native/components/lotes/LotesGrid';
import CatalogoViewControl from '../native/components/catalogos/CatalogoViewControl';

import { getLotes, setError } from '../actions/lotesActions';

class LotesContainer extends Component {
  static propTypes = {
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    viewSettings: PropTypes.object.isRequired,
    getLotes: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    activeLotes: PropTypes.array,
    // activeLotes prop passed from CatalogosContainer
    // to filter Lotes by Catalog in loteReducer
  }

  constructor(props) {
    super(props)
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

  returnLotesLayout = () => {
    const { error, loading, lotes } = this.props.lotes;
    const { filterBy, orderBy, grid } = this.props.viewSettings;

    if (grid) {
      return (
        <LotesGrid
          error={error}
          loading={loading}
          lotes={lotes}
          filterBy={filterBy}
          orderBy={orderBy}
          reFetch={() => this.fetchLotes()}
        />
      );
    }
    return (
      <LotesList
        error={error}
        loading={loading}
        lotes={lotes}
        filterBy={filterBy}
        orderBy={orderBy}
        reFetch={() => this.fetchLotes()}
      />
    );
  }

  render = () => {
    const { viewSettings } = this.props;

    return (
      <View>
        <CatalogoViewControl
          viewSettings={viewSettings}
        />
        {this.returnLotesLayout()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
  viewSettings: state.catalogos.viewSettings || {},
});

const mapDispatchToProps = {
  getLotes,
  setError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LotesContainer);
