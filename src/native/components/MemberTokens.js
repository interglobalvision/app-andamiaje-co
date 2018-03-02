import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../constants/styles';

const MiembroProfile = ({
	miembros,
  member,
}) => {
  return (
    <View style={[
      styles.container,
    ]}><Text style={[
      styles.fontSizeSmall,
      styles.fontFamilyMedium,
    ]}>ŧ 15</Text></View>
  )
}

const mapStateToProps = state => ({
  miembros: state.miembros || {},
  member: state.member || {},
});

export default connect(mapStateToProps, null)(MemberTokens);
