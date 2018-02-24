import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import styles from '../../constants/styles';
import TextBullet from '../TextBullet';
import _find from 'lodash/find';

import { addToWishlist, removeFromWishlist } from '../../../actions/member';

class LoteHeader extends Component {
  static propTypes = {
    addToWishlist: PropTypes.func.isRequired,
    removeFromWishlist: PropTypes.func.isRequired,
    wishlist: PropTypes.object.isRequired,
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
    //const isWishlist = wishlist.find(item => item.id === lote.id);
    const isWishlist = _find(wishlist, item => item.id === lote.id);

    const iconImageStyle = {width: 18.5, height: 25};

    if (isWishlist) {
      // show remove button
      return (
        <TouchableOpacity onPress={ () => {this.removeWishlistLote()} }>
          <Image source={require('../../../images/icons/icon-wishlist-check.png')} style={iconImageStyle} />
        </TouchableOpacity>
      );
    }
    return (
      // show add button
      <TouchableOpacity onPress={ () => {this.addWishlistLote()} }>
        <Image source={require('../../../images/icons/icon-wishlist-plus.png')} style={iconImageStyle} />
      </TouchableOpacity>
    );
  }

  renderObrasLength = () => {
    const { obras } = this.props.lote;
    let obraText = 'Obra';

    if (obras.length > 1) {
      obraText = 'Obras';
    }

    return (<Text style={[styles.fontSizeSmall]}>{ obras.length } {obraText}</Text>)
  }

  render() {
    const { lote } = this.props;

    return (
      <View style={[
        styles.container,
        styles.bordered,
        styles.backgroundWhite,
        styles.loteHeader
      ]}>
        <View>
          <View style={styles.flexRow}>
            {this.renderObrasLength()}
            <TextBullet />
            <Text style={[styles.fontSizeSmall]}>ŧ { lote.price }</Text>
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
