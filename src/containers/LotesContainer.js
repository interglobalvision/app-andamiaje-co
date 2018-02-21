import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { orderBy } from 'lodash';
import _filter from 'lodash/filter';

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

  applyFilter = (lotes) => {
    let filteredLotes = lotes;
    const filterLotesBy = this.props.viewSettings.filterBy;

    if (filterLotesBy !== '' && filterLotesBy !== undefined && filterLotesBy !== null) {
      filteredLotes = _filter(lotes, lote => lote.tecnica.includes(filterLotesBy) );
    }

    return filteredLotes;
  }

  applyOrder = (lotes) => {
    const orderLotesBy = this.props.viewSettings.orderBy;

    switch (orderLotesBy) {
      case 'artist-az': {
        const orderedLotes = orderBy(lotes, lote => lote.artista.name, 'asc');
        return orderedLotes;
      }
      case 'artist-za': {
        const orderedLotes = orderBy(lotes, lote => lote.artista.name, 'desc');
        return orderedLotes;
      }
      case 'price-asc': {
        const orderedLotes = orderBy(lotes, lote => lote.price, 'asc');
        return orderedLotes;
      }
      case 'price-desc': {
        const orderedLotes = orderBy(lotes, lote => lote.price, 'desc');
        return orderedLotes;
      }
      case '': {
        return lotes;
      }
      default: {
        return lotes;
      }
    }
  }

  returnLotesLayout = () => {
    const { error, loading, lotes } = this.props.lotes;
    const { grid } = this.props.viewSettings;

    const orderedLotes = this.applyOrder(lotes);
    const orderedFilteredLotes = this.applyFilter(orderedLotes);

    if (orderedFilteredLotes.length) {
      if (grid) {
        return (
          <LotesGrid
            error={error}
            loading={loading}
            lotes={orderedFilteredLotes}
            orderBy={orderBy}
            reFetch={() => this.fetchLotes()}
          />
        );
      }
      return (
        <LotesList
          error={error}
          loading={loading}
          lotes={orderedFilteredLotes}
          orderBy={orderBy}
          reFetch={() => this.fetchLotes()}
        />
      );
    } else {
      return (
        <View style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
          <Text>No hay lotes con esa tecnica</Text>
        </View>
      )
    }
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
