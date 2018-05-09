import React from 'react';
import PropTypes from 'prop-types';
import { Text, StyleSheet, View } from 'react-native';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import styles from '../../constants/styles';
import Spacer from '../Spacer';

const CalendarItem = ({ item }) => (
  <View style={[styles.container, styles.calendarItem]}>
    <View style={[
      {
        justifyContent: 'center',
      },
    ]}
    >
      <Text style={[styles.colorWhite, styles.fontBold]}>{item.label}</Text>
      { item.label2 !== undefined ? <View style={[styles.paddingTopTiny]}><Text style={[styles.colorWhite, styles.fontSizeSmall]}>{item.label2}</Text></View> : null }
    </View>
    <View style={styles.calendarDate}>
      <Text style={[styles.fontBold, styles.textAlignCenter, styles.colorWhite, styles.fontSizeLarge]}>{format(item.date, 'DD')}</Text>
      <Text style={[styles.fontBold, styles.textAlignCenter, styles.colorWhite, styles.fontSizeTiny]}>{format(item.date, 'MMMM', { locale: es }).toUpperCase()}</Text>
    </View>
  </View>
);

export default CalendarItem;
