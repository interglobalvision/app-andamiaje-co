import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  calendarItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: 'white',
    backgroundColor: 'black',
  }
});

const CalendarItem = ({item}) => (
  <View style={styles.calendarItem}>
    <Text style={{ fontWeight: '800', flex: 1, color: 'white' }}>{item.label}</Text>
    <View style={{
      flexDirection: 'column',
      justifyContent: 'space-around',
      flexWrap: 'nowrap',
      width: 50,
    }}>
      <Text style={{ fontWeight: '800', textAlign: 'center', color: 'white' }}>{format(item.date, 'DD')}</Text>
      <Text style={{ fontWeight: '800', textAlign: 'center', color: 'white' }}>{format(item.date, 'MMM')}</Text>
    </View>
  </View>
);

export default CalendarItem;
