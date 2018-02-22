import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  bordered: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'black',
  }
});

const CalendarItem = ({item}) => (
  <View>
    <Text style={{ fontWeight: '800' }}>{item.label}</Text>
    <Text style={{ fontWeight: '800' }}>{format(item.date, 'DD')}</Text>
    <Text style={{ fontWeight: '800' }}>{format(item.date, 'MMM')}</Text>
  </View>
);

export default CalendarItem;
