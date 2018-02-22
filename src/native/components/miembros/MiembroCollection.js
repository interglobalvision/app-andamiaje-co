import React from 'react';
import { View, Text } from 'react-native';

import SectionHeader from '../SectionHeader';
import Spacer from '../Spacer';

const MiembroCollection = ({ miembroId, memberId, collection }) => {
  const isCurrentMember = miembroId === memberId ? true : false;
  const headerTitle = isCurrentMember ? 'Tu colección' : 'Colección';
  const emptyNotice = isCurrentMember ? 'Tu colección aún está vacía' : 'Esta colección aún está vacía';

  return (
    <View>
      <SectionHeader title={headerTitle}/>
      <Spacer />
      <View>
        <Text>{emptyNotice}</Text>
      </View>
      <Spacer />
    </View>
  )
};

export default MiembroCollection;