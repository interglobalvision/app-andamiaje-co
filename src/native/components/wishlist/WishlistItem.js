import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getResizedImageUrl } from '../../../lib/utilities';

import LoteHeader from '../lotes/LoteHeader';
import styles from '../../constants/styles';
import BuyButton from '../BuyButton';

export default class WishlistItem extends Component {
  static propTypes = {
    lote: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render = () => {
    const { lote } = this.props;

    let imageSource = require('../../../images/placeholder.png');

    if (lote.obras[0].images !== undefined) {
      imageSource = { uri: getResizedImageUrl(lote.obras[0].images[0], 350, true) };
    }

    returnObra = (obra, key) => (
      <View key={key} style={[styles.flexRow, styles.paddingBottomTiny]}>
        <Text style={{ flex: 1, flexWrap: 'wrap' }}>
          <Text style={[styles.fontFamilyItalic]}>{obra.title}</Text>, {obra.year}
        </Text>
      </View>
    );

    const keyExtractor = item => item.id;

    const onPress = item => Actions.lote({
      match: {
        params: {
          id: String(item.id),
        },
      },
    });

    return (
      <View style={[
        styles.bordered,
        styles.paddingBottomBasic,
      ]}
      >
        <LoteHeader lote={lote} bordered={false} />
        <TouchableOpacity
          onPress={() => { onPress(lote); }}
          style={[
          styles.container,
          styles.flexRow,
          styles.paddingBottomBasic,
        ]}
        >
          <View style={styles.wishlistImageHolder}>
            <Image style={styles.wishlistImage} source={imageSource} />
          </View>
          <View style={styles.wishlistTextHolder}>
            <View style={styles.paddingBottomSmall}>
              <Text style={styles.fontBold}>{lote.artista.name}</Text>
            </View>
            <View>
              { lote.obras.map((item, key) => returnObra(item, key))}
            </View>
          </View>
        </TouchableOpacity>
        <BuyButton lote={lote} />
      </View>
    );
  }
}
