import React from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import Colors from '../../../native-base-theme/variables/commonColor';
import { Text } from 'native-base';

const DirectoryListItem = ({ name, images }) => {
  const placeholder = 'http://via.placeholder.com/50x50';
  // TODO: Need a placeholder image for missing avatars
  const imageSrc = images !== undefined ? images[0].downloadURL : placeholder;

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
      <View style={{ flexBasis: 50, minHeight: 50 }}>
        <Image source={{ uri: imageSrc }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>
      <View style={{ paddingLeft: 10 }}>
        <Text>{ name }</Text>
      </View>
    </View>
  )
};

export default DirectoryListItem;
