import React from 'react';
import { ScrollView, View, Text } from 'react-native';

import DraftContentRenderer from '../DraftContentRenderer';

import styles from '../../constants/styles';

const ArtistaCVPage = ({ content }) => (
  <ScrollView style={[styles.backgroundWhite]}>
    <View style={[styles.container, styles.paddingTopBasic, styles.paddingBottomLarge]}>
      <DraftContentRenderer rawContent={content} />
    </View>
  </ScrollView>
);

export default ArtistaCVPage;