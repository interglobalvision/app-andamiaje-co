import React from 'react';
import { ScrollView, View, Text } from 'react-native';

const MiembroOptionsPage = ({ content }) => (
  <ScrollView>
    <View>
      <Text>{content}</Text>
    </View>
  </ScrollView>
);

export default MiembroOptionsPage;
