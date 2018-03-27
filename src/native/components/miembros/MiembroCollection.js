import React from 'react';
import { View, Text } from 'react-native';

import MemberCollectionContainer from '../../../containers/MemberCollectionContainer';
import CollectionLotes from './CollectionLotes';
import SectionHeader from '../SectionHeader';
import styles from '../../constants/styles';

const MiembroCollection = ({ miembroId, memberId, collection }) => {

  const emptyCollection = collection && Object.keys(collection).length ? false : true;
  const isCurrentMember = miembroId === memberId ? true : false;
  const headerTitle = isCurrentMember ? 'Tu colección' : 'Colección';
  const emptyNotice = emptyCollection && isCurrentMember ? 'Tu colección aún está vacía' : 'Esta colección aún está vacía';

  return (
    <View>
      <SectionHeader title={headerTitle}/>
      { emptyCollection ? <View style={[
        styles.container,
        styles.backgroundWhite,
        styles.flexCenter,
        styles.emptyItemsHeight
      ]}><Text>{emptyNotice}</Text></View> : <MemberCollectionContainer collection={collection} Layout={CollectionLotes} /> }
    </View>
  )
};

export default MiembroCollection;
