import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import OrderPicker from '../../components/fields/OrderPicker';
import FilterPicker from '../../components/fields/FilterPicker';

import { changeCatalogoLayout, changeCatalogoOrder, changeCatalogoFilter } from '../../../actions/catalogosActions';

import Spacer from '../Spacer';

class CatalogoViewControl extends Component {
  static propTypes = {
    viewSettings: PropTypes.object.isRequired,
    changeCatalogoLayout: PropTypes.func.isRequired,
    changeCatalogoOrder: PropTypes.func.isRequired,
    changeCatalogoFilter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { grid, orderBy, filterBy } = this.props.viewSettings;

    return (
      <View>
        <Spacer />
        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
              flexBasis: '20%',
            }}
            onPress={() => {this.props.changeCatalogoLayout(true)}}
          >
            <Spacer />
            <Text style={{
              textAlign: 'center',
            }}>Grid</Text>
            <Spacer />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexBasis: '20%',
            }}
            onPress={() => {this.props.changeCatalogoLayout(false)}}
          >
            <Spacer />
            <Text style={{
              textAlign: 'center',
            }}>List</Text>
            <Spacer />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexBasis: '30%',
            }}
          >
            <Spacer />
            <OrderPicker onValueChange={this.props.changeCatalogoOrder} initValue={orderBy} />
            <Spacer />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexBasis: '30%',
            }}
          >
            <Spacer />
            <FilterPicker onValueChange={this.props.changeCatalogoFilter} initValue={filterBy} />
            <Spacer />
          </TouchableOpacity>
        </View>
        <Spacer />
      </View>
    );
  }
};

const mapStateToProps = state => ({
  viewSettings: state.catalogos.viewSettings || {},
});

const mapDispatchToProps = {
  changeCatalogoLayout,
  changeCatalogoOrder,
  changeCatalogoFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogoViewControl);
