import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl } from '../../../lib/utilities';
import styles from '../../constants/styles';

const ArtistasListItem = ({ name, images, id, type }) => {
  const placeholder = 'http://via.placeholder.com/50x50';
  // TODO: Need a placeholder image for missing avatars
  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

  const onPress = id => Actions.artista({ match: { params: { id: String(id) } } });

  return (
    <TouchableOpacity onPress={() => onPress(id)} style={[
      styles.container,
      styles.paddingTopSmall,
      styles.paddingBottomSmall,
      styles.bordered
    ]}>
      <View style={[
        styles.container,
        styles.flexRow,
        {alignItems: 'center'}
      ]}>
        <View style={styles.directoryImageHolder}>
          <Image source={{ uri: imageSrc }} style={styles.directoryImage} />
        </View>
        <View style={styles.directoryTextHolder}>
          <Text>{ name }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default ArtistasListItem;
