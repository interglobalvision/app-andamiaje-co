import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { connect } from 'react-redux';

import LotesList from '../native/components/lotes/LotesList';
import LotesGrid from '../native/components/lotes/LotesGrid';
import CatalogoViewControl from '../native/components/catalogos/CatalogoViewControl';

import { getLotes, setError as setLotesError } from '../actions/lotesActions';
import { getObras, setError as setObrasError } from '../actions/obrasActions';

class LotesContainer extends Component {
  static propTypes = {
    Layout: PropTypes.func,
    lotes: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      lotes: PropTypes.array.isRequired,
    }).isRequired,
    obras: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      error: PropTypes.string,
      obras: PropTypes.array.isRequired,
    }).isRequired,
    viewSettings: PropTypes.object.isRequired,
    getLotes: PropTypes.func.isRequired,
    setLotesError: PropTypes.func.isRequired,
    getObras: PropTypes.func.isRequired,
    setObrasError: PropTypes.func.isRequired,
    includeObras: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    if (this.props.includeObras) {
      this.fetchLotesAndObras();
    } else {
      this.fetchLotes();
    }
  }

  /**
    * Fetch Data from API, saving to Redux
    */
  fetchLotesAndObras = () => {
    return this.props.getLotes()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setLotesError(err);
      })
      .then(this.props.getObras)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setObrasError(err);
      });

  }

  fetchLotes = () => {
    return this.props.getLotes()
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setLotesError(err);
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
    const { viewSettings, Layout, match } = this.props;
    const id = (match && match.params && match.params.id) ? match.params.id : null;

    if (id !== null) {
      const { obras } = this.props.obras;
      const { lotes } = this.props.lotes;

      const loading = this.props.lotes.loading || this.props.obras.loading ? true : false;
      const error = this.props.lotes.error + this.props.obras.error;

      const lote = lotes.find(item => item.id === id);

      return (
        <Layout
          lote={lote}
          obras={obras}
          loading={loading}
          error={error}
          reFetch={() => this.fetchLotesAndObras()}
        />
      );
    }

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
  obras: state.obras || [],
});

const mapDispatchToProps = {
  getLotes,
  setLotesError,
  getObras,
  setObrasError,
};

export default connect(mapStateToProps, mapDispatchToProps)(LotesContainer);
