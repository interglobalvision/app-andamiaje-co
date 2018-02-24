import React from 'react';
import { View, Text } from 'react-native';

import SectionHeader from '../SectionHeader';
import styles from '../../constants/styles';

const MiembroCollection = ({ miembroId, memberId, collection }) => {
  const isCurrentMember = miembroId === memberId ? true : false;
  const headerTitle = isCurrentMember ? 'Tu colección' : 'Colección';
  const emptyNotice = isCurrentMember ? 'Tu colección aún está vacía' : 'Esta colección aún está vacía';

  return (
    <View>
      <SectionHeader title={headerTitle}/>
      <View style={[
        styles.container,
        styles.backgroundWhite,
        styles.flexCenter,
        styles.emptyItemsHeight
      ]}>
        <Text>{emptyNotice}</Text>
      </View>
    </View>
  )
};

export default MiembroCollection;
