import React from 'react';
import { TouchableOpacity, View, ActivityIndicator, Image } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Text } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { getResizedImageUrl } from '../../lib/utilities';

const DirectoryListItem = ({ name, images, id }) => {
  const placeholder = 'http://via.placeholder.com/50x50';
  // TODO: Need a placeholder image for missing avatars
  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

  const onPress = id => Actions.artista({ match: { params: { id: String(id) } } });

  return (
    <TouchableOpacity onPress={() => onPress(id)}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
        <View style={{ flexBasis: 50, minHeight: 50 }}>
          <Image source={{ uri: imageSrc }} style={{ width: 50, height: 50, borderRadius: 25 }} />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Text>{ name }</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
};

export default DirectoryListItem;
