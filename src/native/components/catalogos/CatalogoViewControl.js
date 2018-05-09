import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import OrderPicker from '../../components/fields/OrderPicker';
import FilterPicker from '../../components/fields/FilterPicker';
import styles from '../../constants/styles';

import { changeCatalogoLayout, changeCatalogoOrder, changeCatalogoFilter } from '../../../actions/catalogosActions';

class CatalogoViewControl extends Component {
  static propTypes = {
    viewSettings: PropTypes.object.isRequired,
    changeCatalogoLayout: PropTypes.func.isRequired,
    changeCatalogoOrder: PropTypes.func.isRequired,
    changeCatalogoFilter: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
  }

  renderGridIcon = () => {
    const { grid } = this.props.viewSettings;
    const iconImageStyle = { width: 20, height: 20 };
    if (grid) {
      return (<Image source={require('../../../images/icons/icon-grid-black.png')} style={iconImageStyle} />);
    }
    return (<Image source={require('../../../images/icons/icon-grid-white.png')} style={iconImageStyle} />);
  }

  renderListIcon = () => {
    const { grid } = this.props.viewSettings;
    const iconImageStyle = { width: 21.6, height: 20 };
    if (grid) {
      return (<Image source={require('../../../images/icons/icon-list-white.png')} style={iconImageStyle} />);
    }
    return (<Image source={require('../../../images/icons/icon-list-black.png')} style={iconImageStyle} />);
  }

  render() {
    const { orderBy, filterBy } = this.props.viewSettings;

    return (
      <View style={[
        styles.container,
        styles.backgroundWhite,
        styles.paddingTopBasic,
        styles.paddingBottomBasic,
        styles.bordered,
      ]}
      >
        <View style={[
          styles.flexRow,
          styles.flexCenter,
        ]}
        >
          <TouchableOpacity
            style={[
              styles.flexCenter,
              {
                flexBasis: '20%',
              },
            ]}
            onPress={() => { this.props.changeCatalogoLayout(false); }}
          >
            {this.renderListIcon()}
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.flexCenter,
              {
                flexBasis: '20%',
              },
            ]}
            onPress={() => { this.props.changeCatalogoLayout(true); }}
          >
            {this.renderGridIcon()}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexBasis: '30%',
            }}
          >
            <OrderPicker onValueChange={this.props.changeCatalogoOrder} initValue={orderBy} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flexBasis: '30%',
            }}
          >
            <FilterPicker onValueChange={this.props.changeCatalogoFilter} initValue={filterBy} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  viewSettings: state.catalogos.viewSettings || {},
});

const mapDispatchToProps = {
  changeCatalogoLayout,
  changeCatalogoOrder,
  changeCatalogoFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(CatalogoViewControl);
