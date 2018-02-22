import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { distanceInWordsToNow } from 'date-fns';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { Actions } from 'react-native-router-flux';
import styles from '../../constants/styles';
import TextBullet from '../TextBullet';

import ResponsiveImageView from 'react-native-responsive-image-view';

import Spacer from '../Spacer';

const onPress = id => Actions.artista({ match: { params: { id: String(id) } } });

const renderArtista = (item) => {
  if (item.artista !== undefined) {
    return (
      <TouchableOpacity onPress={() => onPress(item.artista.id)}  style={styles.paddingBottomMid}>
        <Text>Ver el bio de {item.artista.name}</Text>
      </TouchableOpacity>
    );
  }
  return null;
}

const NoticiaItem = ({item}) => {
  return (
    <View style={[
      styles.container,
      styles.bordered,
      styles.paddingTopMid,
      styles.paddingBottomLarge
    ]}>
      <View style={styles.paddingBottomBasic}>
        <Text>
          <Text style={[styles.fontBold, styles.fontSizeMid ]}>{item.title}</Text>          <TextBullet />
          <Text>{distanceInWordsToNow(item.publishDate)}</Text>
        </Text>
      </View>

      <View style={styles.paddingBottomMid}>{getRNDraftJSBlocks({ contentState: JSON.parse(item.rawContent) })}</View>

      {renderArtista(item)}

      { item.images !== undefined && item.images.length ?
        <ResponsiveImageView
          source={{ uri: item.images[0].downloadURL}}
          render={({ getViewProps, getImageProps }) => (
            <View {...getViewProps()}>
              <Image {...getImageProps()} />
            </View>
          )}
        /> : '' }
    </View>
  );
}

export default NoticiaItem;
