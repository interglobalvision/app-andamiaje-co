import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../../native/constants/colors';

const Loading = () => (
  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
    <ActivityIndicator size="large" color={colors.black} />
  </View>
);

export default Loading;
