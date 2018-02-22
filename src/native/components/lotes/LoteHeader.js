import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../constants/styles';

import { addToWishlist, removeFromWishlist } from '../../../actions/member';

class LoteHeader extends Component {
  static propTypes = {
    addToWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,
    wishlist: PropTypes.array.isRequired,
    lote: PropTypes.object.isRequired,
    bordered: PropTypes.bool,
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
          <Text >Remove</Text>
        </TouchableOpacity>
      );
    }
    return (
      // show add button
      <TouchableOpacity onPress={ () => {this.addWishlistLote()} }>
        <Text>Add</Text>
      </TouchableOpacity>
    );
  }

  renderObrasLength = () => {
    const { obras } = this.props.lote;

    if (obras.length > 1) {
      return (<Text>{ obras.length } Obras</Text>)
    }

    return (<Text>{ obras.length } Obra</Text>)
  }

  render() {
    const { lote, bordered } = this.props;

    let containerStyle = [styles.container, styles.loteHeader];

    if (bordered) {
      containerStyle = [styles.container, styles.bordered, styles.loteHeader];
    }

    return (
      <View style={containerStyle}>
        <View>
          <View style={styles.flexRow}>
            {this.renderObrasLength()}
            <Text>  •  </Text>
            <Text>ŧ { lote.price }</Text>
          </View>
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
