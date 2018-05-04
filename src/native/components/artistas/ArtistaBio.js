import React from 'react';
import PropTypes from 'prop-types';
import { Dimensions, TouchableOpacity, View, Text } from 'react-native';
import styles from '../../constants/styles';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo';
import DraftContentRenderer from '../DraftContentRenderer';

class ArtistaBio extends React.Component {
  static propTypes = {
    bioRawContent: PropTypes.string.isRequired,
  }

  static defaultProps = {
    bioRawContent: '',
  }

  constructor(props) {
    super(props);
  }

  showFullBio = () => {
    const transitionDuration = 1000;

    this.containerView.transitionTo(
      {
        height: this.bioHeight,
        borderBottomWidth: 0, // this solves a zIndex issue on android
      },
      transitionDuration,
      'ease-out',
    );

    this.buttonView.transitionTo(
      {
        opacity: 0,
      },
      transitionDuration,
      'ease-out',
    );
  }

  render() {
    const { bioRawContent } = this.props;

    const windowHeight = Dimensions.get('window').height;

    const handleViewRef = ref => this.view = ref;

    if (bioRawContent === '' || bioRawContent === undefined) {
      return null;
    }

    return (
      <View style={[
        styles.container,
        styles.paddingTopBasic,
        styles.paddingBottomMid,
        styles.bordered,
      ]}
      >
        <Animatable.View
          ref={ref => this.containerView = ref}
          style={[
            styles.bordered,
            {
              overflow: 'hidden',
              height: windowHeight * 0.4,
            },
          ]}
        >
          <View
            onLayout={(event) => {
              this.bioHeight = event.nativeEvent.layout.height;
            }}
          >
            <DraftContentRenderer rawContent={bioRawContent} />
          </View>
        </Animatable.View>
        <Animatable.View
          ref={ref => this.buttonView = ref}
          style={[
            styles.container,
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              justifyContent: 'flex-end',
            },
        ]}
        >
          <LinearGradient
            colors={[
              'rgba(255,255,255,0)',
              'rgba(255,255,255,1)',
              'rgba(255,255,255,1)',
            ]}
          >
            <TouchableOpacity
              onPress={this.showFullBio}
              style={[
                styles.paddingTopLarge,
                styles.paddingBottomBasic,
                {
                  backgroundColor: 'transparent',
                },
            ]}
            >
              <Text style={[
                styles.textLink,
              ]}
              >Ver todo
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animatable.View>
      </View>
    );
  }
}

export default ArtistaBio;
