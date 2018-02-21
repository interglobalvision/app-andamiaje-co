import React from 'react';
import { StyleSheet, TouchableOpacity, View, ActivityIndicator, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl } from '../../../lib/utilities';

import Spacer from '../Spacer';

const ArtistasListItem = ({ name, images, id, type }) => {
  const placeholder = 'http://via.placeholder.com/50x50';
  // TODO: Need a placeholder image for missing avatars
  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

  const onPress = id => Actions.artista({ match: { params: { id: String(id) } } });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    imageHolder: {
      flexBasis: 50,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    textHolder: {
      paddingLeft: 10,
    },
  });

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <Spacer />
      <View style={styles.container}>
        <View style={styles.imageHolder}>
          <Image source={{ uri: imageSrc }} style={styles.image} />
        </View>
        <View style={styles.textHolder}>
          <Text>{ name }</Text>
        </View>
      </View>
      <Spacer />
    </TouchableOpacity>
  )
};

export default ArtistasListItem;
