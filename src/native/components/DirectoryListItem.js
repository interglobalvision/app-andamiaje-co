import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, Image, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl } from '../../lib/utilities';
import styles from '../constants/styles';

const DirectoryListItem = ({ name, images, id, type, currentMember, collection }) => {
  let imageSource = require('../../images/placeholder.png');

  if (images !== undefined) {
    imageSource = {uri: getResizedImageUrl(images[0], 350, true)};
  }

  let onPress = id => Actions.miembro({ match: { params: { id: String(id) } } });

  if (type === 'artista') {
    onPress = id => Actions.artista({ match: { params: { id: String(id) } } });
  }

  if (currentMember) {
    const collectionLength = collection !== undefined && collection !== {} ? Object.keys(collection).length : 0;
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
            <Image source={imageSource} style={[styles.profileAvatarImage]} />
          </View>
          <View style={[styles.profileHeaderTextHolder]}>
            <Text style={[styles.fontFamilyMedium, styles.paddingBottomSmall]}>{ name }</Text>
            <Text style={[styles.fontSizeSmall]}>Colección de {collectionLengthString}</Text>
            <View style={[styles.paddingTopBasic]}>
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
          <Image source={imageSource} style={styles.directoryImage} />
        </View>
        <View style={styles.directoryTextHolder}>
          <Text>{ name }</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default DirectoryListItem;
