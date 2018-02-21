import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Flatlist } from 'react-native';
import { connect } from 'react-redux';

export default class WishlistItem extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render = () => {
    const { item } = this.props;

    return (
      <View>
        <Text>Wishlist</Text>
      </View>
    );
  }
}
