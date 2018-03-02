import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getResizedImageUrl } from '../../../lib/utilities';

import LoteHeader from '../lotes/LoteHeader'
import styles from '../../constants/styles';

export default class WishlistItem extends Component {
  static propTypes = {
    lote: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render = () => {
    const { lote } = this.props;

    let imageSource = require('../../../images/placeholder.png');

    if (lote.obras[0].images !== undefined) {
      imageSource = {uri: getResizedImageUrl(lote.obras[0].images[0], 350, true)};
    }

    returnObra = (obra) => {
      return (
        <View style={[styles.flexRow, styles.paddingBottomTiny]}>
          <Text style={{flex: 1, flexWrap: 'wrap'}}>
            <Text style={[styles.fontFamilyItalic]}>{obra.title}</Text>, {obra.year}
          </Text>
        </View>
      );
    }

    const keyExtractor = item => item.id;

    const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

    return (
      <View style={styles.bordered}>
        <LoteHeader lote={lote} />
        <TouchableOpacity onPress={() => {onPress(lote)}} style={[
          styles.container,
          styles.flexRow,
          styles.paddingBottomBasic,
          styles.paddingTopBasic
        ]}>
          <View style={styles.wishlistImageHolder}>
            <Image style={styles.wishlistImage} source={imageSource} />
          </View>
          <View style={styles.wishlistTextHolder}>
            <View style={styles.paddingBottomSmall}>
              <Text style={styles.fontBold}>{lote.artista.name}</Text>
            </View>
            <View>
              { lote.obras.map( (item) => returnObra(item) )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
/*
<FlatList
  numColumns={1}
  data={lote.obras}
  renderItem={({item}) => returnObra(item)}
  keyExtractor={keyExtractor}
/>
*/
