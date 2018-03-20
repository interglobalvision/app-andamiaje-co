import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import styles from '../constants/styles';

class MemberTokens extends Component {

  constructor(props) {
    super(props);
    Animatable.initializeRegistryWithDefinitions({
      bigBounceIn: {
        0: {
          opacity: 0,
          scale: 0.3,
        },
        0.2: {
          scale: 1.5,
        },
        0.4: {
          scale: 0.95,
          opacity: 1,
        },
        0.6: {
          scale: 1.7,
        },
        0.8: {
          scale: 0.97,
        },
        1: {
          opacity: 1,
          scale: 1,
        },
      }
    });
  }

  componentWillUpdate() {
    this.animateTokens(this.view);
  }

  animateTokens(viewRef) {
    viewRef.bigBounceIn(1000);
  }

  render() {
    const {
      error,
      loading,
      miembros,
      member,
      reFetch,
    } = this.props;

    // Loading
    if (loading || error) return ( <View></View> );

    // check if logged in member is Miembro
    const currentMiembro = miembros.find(miembro => miembro.id === member.uid);

    handleViewRef = ref => this.view = ref;

    if (currentMiembro !== undefined && currentMiembro !== null) {
      if (currentMiembro.tokens === undefined || currentMiembro.tokens === '') {
        return <View></View>
      }

      return (
        <Animatable.View
          ref={handleViewRef}
        >
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
        </Animatable.View>
      )
    }

    return (
      <View></View>
    )

  }
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
