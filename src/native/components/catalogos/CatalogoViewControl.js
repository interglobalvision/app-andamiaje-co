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
  }

  constructor(props) {
    super(props)
  }

  handleLayoutChange = (setting) => {
    return this.props.changeCatalogoLayout(setting);
  }

  render() {
    return (
      <View>
        <View style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
          <TouchableOpacity
            style={{
              flexBasis: '20%',
            }}
            onPress={() => {this.handleLayoutChange('grid')}}
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
            onPress={() => {this.handleLayoutChange('list')}}
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
            <OrderPicker onValueChange={this.props.changeCatalogoOrder} />
            <Spacer />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexBasis: '30%',
            }}
          >
            <Spacer />
            <FilterPicker onValueChange={this.props.changeCatalogoFilter} />
            <Spacer />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const mapDispatchToProps = {
  changeCatalogoLayout,
  changeCatalogoOrder,
};

export default connect(null, mapDispatchToProps)(CatalogoViewControl);
