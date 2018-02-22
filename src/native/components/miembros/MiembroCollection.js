import React from 'react';
import { View, Text } from 'react-native';

import Spacer from '../Spacer';

const MiembroCollection = ({ miembroId, memberId, collection }) => {
  const emptyNotice = miembroId === memberId ? 'Tu colección aún está vacía' : 'Esta colección aún está vacía';

  return (
    <View>
      <Spacer />
      <View>
        <Text>{emptyNotice}</Text>
      </View>
      <Spacer />
    </View>
  )
};

export default MiembroCollection;
