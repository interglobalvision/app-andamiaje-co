import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View } from 'react-native';
import { Card, CardItem, Body, Text, Button } from 'native-base';
import { distanceInWordsToNow } from 'date-fns';
import getRNDraftJSBlocks from 'react-native-draftjs-render';

import ResponsiveImageView from 'react-native-responsive-image-view';

import Spacer from '../Spacer';

const styles = StyleSheet.create({
  bordered: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
  }
});

const NoticiaItem = ({item}) => (
  <View style={styles.bordered}>
    <Spacer size={15} />
    <Text style={{ fontWeight: '800' }}>{item.title} • {distanceInWordsToNow(item.publishDate)}</Text>
    <Spacer size={15} />
    <View>{getRNDraftJSBlocks({ contentState: JSON.parse(item.rawContent) })}</View>
    <Spacer size={15} />
    { item.images !== undefined && item.images.length ?
      <ResponsiveImageView
        source={{ uri: item.images[0].downloadURL}}
        render={({ getViewProps, getImageProps }) => (
          <View {...getViewProps()}>
            <Image {...getImageProps()} />
          </View>
        )}
      /> : '' }
    <Spacer size={15} />
  </View>
);

export default NoticiaItem;
