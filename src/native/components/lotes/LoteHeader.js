import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

import { addToWishlist, removeFromWishlist } from '../../../actions/member';

import Spacer from '../Spacer';

class LoteHeader extends Component {
  static propTypes = {
    addToWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,
    wishlist: PropTypes.array.isRequired,
    lote: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  addWishlistLote = () => {
    return this.props.addToWishlist(this.props.lote)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  removeWishlistLote = () => {
    return this.props.removeFromWishlist(this.props.lote)
      .catch((err) => {
        console.log(`Error: ${err}`);
        return this.props.setError(err);
      });
  }

  returnWishlistButton = () => {
    const { wishlist, lote } = this.props;

    // true if wishlist array contains lote ID
    const isWishlist = wishlist.find(item => item.id === lote.id);

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
    const { lote } = this.props;

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
            <Text>{ lote.obras.length }</Text>
            <Text>  •  </Text>
            <Text>ŧ { lote.price }</Text>
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
