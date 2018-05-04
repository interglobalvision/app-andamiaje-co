import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable';

import styles from '../constants/styles';

const MemberTokens = ({
  error,
  loading,
  miembros,
  member,
  reFetch,
}) => {
  // Loading
  if (loading || error) return (<View />);

  // check if logged in member is Miembro
  const currentMiembro = miembros.find(miembro => miembro.id === member.uid);

  if (currentMiembro !== undefined && currentMiembro !== null) {
    if (currentMiembro.tokens === undefined || currentMiembro.tokens === '') {
      return <View />;
    }

    return (
      <TokensDisplay tokens={currentMiembro.tokens} />
    );
  }

  return (
    <View />
  );
};

class TokensDisplay extends Component {
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
      },
    });
  }

  animateTokens(viewRef) {
    viewRef.bigBounceIn(1000);
  }

  componentWillUpdate() {
    this.animateTokens(this.view);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.tokens !== nextProps.tokens;
  }

  render() {
    const { tokens } = this.props;

    handleViewRef = ref => this.view = ref;

    return (
      <Animatable.View
        ref={handleViewRef}
      >
        <View style={[
          styles.container,
        ]}
        >
          <Text style={[
          styles.fontFamilyMedium,
          {
            letterSpacing: 1,
          },
        ]}
          >ŧ {tokens}
          </Text>
        </View>
      </Animatable.View>
    );
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
