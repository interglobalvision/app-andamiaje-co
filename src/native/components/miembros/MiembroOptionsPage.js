import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import styles from '../../constants/styles';

const MiembroOptionsPage = ({ content }) => (
  <ScrollView style={[styles.backgroundWhite]}>
    <View style={[styles.container, styles.paddingTopBasic, styles.paddingBottomLarge]}>
      <Text>{content}</Text>
    </View>
  </ScrollView>
);

export default MiembroOptionsPage;
