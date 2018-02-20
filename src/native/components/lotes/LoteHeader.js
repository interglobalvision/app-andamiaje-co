import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { addToWishlist, removeFromWishlist } from '../../../actions/member';

import Spacer from '../Spacer';

class LoteHeader extends Component {
  static propTypes = {
    loteId: PropTypes.string.isRequired,
    obrasLength: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    addToWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,
    wishlist: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props);
  }

  addWishlistLote = () => {
    return this.props.addToWishlist(this.props.loteId)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  removeWishlistLote = () => {
    return this.props.removeFromWishlist(this.props.loteId)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  returnWishlistButton = () => {
    const { wishlist, loteId } = this.props;

    // true if wishlist array contains lote ID
    const isWishlist = wishlist.includes(loteId);

    if (isWishlist) {
      // show remove button
      return (
        <TouchableOpacity onPress={ () => {this.removeWishlistLote()} }>
          <Spacer />
          <Text >Remove</Text>
          <Spacer />
        </TouchableOpacity>
      );
    }
    return (
      // show add button
      <TouchableOpacity onPress={ () => {this.addWishlistLote()} }>
        <Spacer />
        <Text>Add</Text>
        <Spacer />
      </TouchableOpacity>
    );
  }

  render() {
    const { obrasLength, price } = this.props;

    return (
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }}>
        <View>
          <Spacer />
          <View style={{
            display: 'flex',
            flexDirection: 'row',
          }}>
            <Text>{ obrasLength }</Text>
            <Text>  •  </Text>
            <Text>ŧ { price }</Text>
            <Spacer />
          </View>
          <Spacer />
        </View>
        {this.returnWishlistButton()}
      </View>
    );
  }
};

const mapDispatchToProps = {
  removeFromWishlist,
  addToWishlist,
};

const mapStateToProps = state => ({
  wishlist: state.member.wishlist || [],
});

export default connect(mapStateToProps, mapDispatchToProps)(LoteHeader);
