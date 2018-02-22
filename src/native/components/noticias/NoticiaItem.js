import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { distanceInWordsToNow } from 'date-fns';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { Actions } from 'react-native-router-flux';

import ResponsiveImageView from 'react-native-responsive-image-view';

import Spacer from '../Spacer';

const onPress = id => Actions.artista({ match: { params: { id: String(id) } } });

const renderArtista = (item) => {
  if (item.artista !== undefined) {
    return (
      <TouchableOpacity onPress={() => onPress(item.artista.id)}>
        <Text>Ver el bio de {item.artista.name}</Text>
      </TouchableOpacity>
    );
  }
  return null;
}

const NoticiaItem = ({item}) => {
  console.log(item);
  return (
    <View>
      <Spacer />
      <Text style={{ fontWeight: '800' }}>{item.title} • {distanceInWordsToNow(item.publishDate)}</Text>
      <Spacer />
      <View>{getRNDraftJSBlocks({ contentState: JSON.parse(item.rawContent) })}</View>
      <Spacer />
      {renderArtista(item)}
      <Spacer />
      { item.images !== undefined && item.images.length ?
        <ResponsiveImageView
          source={{ uri: item.images[0].downloadURL}}
          render={({ getViewProps, getImageProps }) => (
            <View {...getViewProps()}>
              <Image {...getImageProps()} />
            </View>
          )}
        /> : '' }
      <Spacer />
    </View>
  );
}

export default NoticiaItem;
