import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl } from '../../lib/utilities';
import styles from '../constants/styles';

const DirectoryListItem = ({ name, images, id, type, currentMember, collection }) => {
  const placeholder = 'http://via.placeholder.com/50x50';
  // TODO: Need a placeholder image for missing avatars
  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

  let onPress = id => Actions.miembro({ match: { params: { id: String(id) } } });

  if (type === 'artista') {
    onPress = id => Actions.artista({ match: { params: { id: String(id) } } });
  }

  if (currentMember) {
    const collectionLength = collection !== undefined ? collection.length : 0;
    const collectionLengthString = collectionLength === 1 ? '1 obra' : collectionLength.toString() + ' obras';

    return (
      <View style={[
        styles.container,
        styles.paddingTopBasic,
        styles.paddingBottomBasic,
        styles.bordered,
      ]}>
        <TouchableOpacity onPress={() => onPress(id)} style={[
          styles.flexRow
        ]}>
          <View>
            <Image source={{ uri: imageSrc }} style={[styles.profileAvatarImage]} />
          </View>
          <View style={[styles.profileHeaderTextHolder]}>
            <Text style={[styles.fontFamilyMedium]}>{ name }</Text>
            <Text style={[styles.fontSizeSmall]}>Colección de {collectionLengthString}</Text>
            <View style={[styles.paddingTopSmall]}>
              <Text style={[styles.fontSizeSmall, styles.textLink]}>Ver tu colección</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={[
      styles.container,
      styles.paddingTopSmall,
      styles.paddingBottomSmall,
    ]}>
      <TouchableOpacity onPress={() => onPress(id)} style={[
        styles.flexRow,
        {alignItems: 'center'}
      ]}>
        <View>
          <Image source={{ uri: imageSrc }} style={styles.directoryImage} />
        </View>
        <View style={styles.directoryTextHolder}>
          <Text>{ name }</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default DirectoryListItem;
