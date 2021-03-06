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
    bordered: PropTypes.bool,
  }

  static defaultProps = {
    bordered: true,
  }

  constructor(props) {
    super(props);
  }

  addWishlistLote = () => this.props.addToWishlist(this.props.lote)
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    })

  removeWishlistLote = () => this.props.removeFromWishlist(this.props.lote)
    .catch((err) => {
      console.log(`Error: ${err}`);
      return this.props.setError(err);
    })

  returnWishlistButton = () => {
    const { wishlist, lote, role } = this.props;

    if (role !== 'member') {
      return;
    }

    // true if wishlist array contains lote ID
    // const isWishlist = wishlist.find(item => item.id === lote.id);
    const isWishlist = _find(wishlist, item => item.id === lote.id);

    const iconImageStyle = { width: 18.5, height: 25 };

    if (isWishlist) {
      // show remove button
      return (
        <TouchableOpacity onPress={() => { this.removeWishlistLote(); }}>
          <Image source={require('../../../images/icons/icon-wishlist-check.png')} style={iconImageStyle} />
        </TouchableOpacity>
      );
    }
    return (
      // show add button
      <TouchableOpacity onPress={() => { this.addWishlistLote(); }}>
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

    return (<Text style={[styles.fontSizeSmall]}>{ obras.length } {obraText}</Text>);
  }

  render() {
    const { lote, bordered } = this.props;

    const containerStyle = [
      styles.container,
      styles.backgroundWhite,
      styles.paddingTopSmall,
      styles.paddingBottomSmall,
      styles.flexRow,
      {
        alignItems: 'center',
        justifyContent: 'space-between',
      },
    ];

    if (bordered) {
      containerStyle.push(styles.bordered);
    }

    return (
      <View style={containerStyle}>
        <View>
          <View style={[styles.flexRow, { alignItems: 'center' }]}>
            {this.renderObrasLength()}
            <TextBullet />
            <Text style={[styles.fontSizeSmall]}>ŧ { lote.price }</Text>
          </View>
        </View>
        {this.returnWishlistButton()}
      </View>
    );
  }
}

const mapDispatchToProps = {
  removeFromWishlist,
  addToWishlist,
};

const mapStateToProps = state => ({
  wishlist: state.member.wishlist || {},
  role: state.member.role || '',
});

export default connect(mapStateToProps, mapDispatchToProps)(LoteHeader);
