import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import styles from '../constants/styles';

const MemberTokens = ({
  error,
  loading,
  miembros,
  member,
  reFetch,
}) => {

  // Loading
  if (loading || error) return ( <View></View> );

  // check if logged in member is Miembro
  const currentMiembro = miembros.find(miembro => miembro.id === member.uid);

  if (currentMiembro !== undefined && currentMiembro !== null) {
    if (currentMiembro.tokens === undefined || currentMiembro.tokens === '') {
      return <View></View>
    }

    return (
      <View style={[
        styles.container,
      ]}>
        <Text style={[
          styles.fontFamilyMedium,
          {
            letterSpacing: 1
          }
        ]}>ŧ {currentMiembro.tokens}</Text>
      </View>
    )
  }

  return (
    <View></View>
  )
}

MemberTokens.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  miembros: PropTypes.array,
  member: PropTypes.object,
};

MemberTokens.defaultProps = {
  error: null,
  loading: true,
  miembros: [],
  member: {},
};

export default MemberTokens;
