import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { getResizedImageUrl } from '../../../lib/utilities';

import LoteHeader from '../lotes/LoteHeader'

export default class WishlistItem extends Component {
  static propTypes = {
    lote: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)
  }

  render = () => {
    const { lote } = this.props;

    const placeholder = 'http://via.placeholder.com/100x10';
    // TODO: Need a placeholder image for missing images
    const imageSrc = lote.obras[0].images !== undefined ? getResizedImageUrl(lote.obras[0].images[0], 350, true) : placeholder;

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: 'row',
      },
      imageHolder: {
        flexBasis: 100,
      },
      image: {
        width: 100,
        height: 100,
      },
      textHolder: {
        paddingLeft: 10,
        flex: 1
      },
    });

    returnObra = (obra) => {
      return (
        <View style={{flexDirection:'row'}}>
          <Text style={{flex: 1, flexWrap: 'wrap'}}>{obra.title}</Text>
        </View>
      );
    }

    const keyExtractor = item => item.id;

    const onPress = item => Actions.lote({ match: { params: { id: String(item.id) } } });

    return (
      <View>
        <LoteHeader lote={lote} />
        <TouchableOpacity onPress={onPress} style={styles.container}>
          <View style={styles.imageHolder}>
            <Image style={styles.image} source={{ uri: imageSrc }} />
          </View>
          <View style={styles.textHolder}>
            <Text style={{ fontWeight: '800' }}>{lote.artista.name}</Text>
            <FlatList
              numColumns={1}
              data={lote.obras}
              renderItem={({item}) => returnObra(item)}
              keyExtractor={keyExtractor}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
