import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _filter from 'lodash/filter';
import _find from 'lodash/find';

import { getLotes, setError as setLotesError } from '../actions/lotesActions';
import { getObras, setError as setObrasError } from '../actions/obrasActions';

class MemberCollectionContainer extends Component {
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
    getLotes: PropTypes.func.isRequired,
    setLotesError: PropTypes.func.isRequired,
    getObras: PropTypes.func.isRequired,
    setObrasError: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  componentDidMount = () => this.fetchLotesAndObras()

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
      })
  }

  render = () => {
    const { Layout, collection, lotes, miembroId } =  this.props;

    return (
      <Layout
        error={lotes.error}
        loading={lotes.loading}
        reFetch={() => this.fetchLotesAndObras()}
        lotes={lotes.lotes}
        collection={collection}
        miembroId={miembroId}
      />
    );
  }
}

const mapStateToProps = state => ({
  lotes: state.lotes || {},
  obras: state.obras || [],
  member: state.member || {},
});

const mapDispatchToProps = {
  getLotes,
  setLotesError,
  getObras,
  setObrasError,
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberCollectionContainer);
