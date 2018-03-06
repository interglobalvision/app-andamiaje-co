import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';

import styles, { containerWidth } from '../constants/styles';
import colors from '../constants/colors';

class BuyButton extends React.Component {
  static propTypes = {
    lote: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      complete: false,
      buttonText: 'Mantener presionado para adquirir',
    }
  }

  onPressIn = () => {
    if (!this.state.complete) {
      const duration = 2000;

      this.pressTimeout = setTimeout(this.confirmBuy, duration);

      this.view.transition(
        {
          right: 0,
        },
        {
          right: containerWidth,
        },
        duration,
        'ease-in'
      );
    }
  }

  onPressOut = () => {
    if (!this.state.complete) {
      this.view.transitionTo(
        {
          right: 0,
        },
        100,
        'linear'
      );

      clearTimeout(this.pressTimeout);
    }
  }

  confirmBuy = () => {
    this.setState({
      complete: true,
      buttonText: 'Cargando...'
    });

    clearTimeout(this.pressTimeout);
  }

  handleViewRef = ref => this.view = ref;

  render = () => {
    const { lote } = this.props;
    const { saleStarted, saleEnded } = this.props.countdown;

    if (saleStarted) {
      return (
        <View style={[
          styles.container,
          styles.paddingTopBasic,
          styles.paddingBottomSmall,
        ]}>
          <TouchableWithoutFeedback
            onPressIn={this.onPressIn}
            onPressOut={this.onPressOut}
          >
            <View style={[]}>

              <View style={[
                styles.backgroundWhite,
                styles.paddingTopBasic,
                styles.paddingBottomBasic,
                styles.flexCenter,
                {
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.lightGrey,
                  width: containerWidth,
                }
              ]}>
                <Text style={[
                  styles.colorBlack,
                  styles.fontFamilyMedium,
                  styles.textAlignCenter,
                ]}>{this.state.buttonText}</Text>
              </View>

              <Animatable.View
                ref={this.handleViewRef}
                style={[
                {
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  overflow: 'hidden',
                  backgroundColor: 'rgba(0,0,0,0)',
                }
              ]}>
                <View style={[
                  styles.backgroundBlack,
                  styles.flexCenter,
                  styles.paddingTopBasic,
                  styles.paddingBottomBasic,
                  {
                    width: containerWidth,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: colors.black,
                  }
                ]}>
                  <Text style={[
                    styles.colorWhite,
                    styles.fontFamilyMedium,
                    styles.textAlignCenter,
                  ]}>{this.state.buttonText}</Text>
                </View>
              </Animatable.View>

            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    } else if (saleEnded) {
      return (
        <View style={[
          styles.container,
          styles.paddingTopBasic,
          styles.paddingBottomSmall,
        ]}>
          <View style={[
            styles.backgroundWhite,
            styles.paddingTopBasic,
            styles.paddingBottomBasic,
            styles.flexCenter,
            {
              borderRadius: 5,
              borderWidth: 1,
              borderColor: colors.lightGrey,
              width: containerWidth,
            }
          ]}>
            <Text style={[
              styles.colorBlack,
              styles.fontFamilyMedium,
              styles.textAlignCenter,
            ]}>Colección de [Usuario]</Text>
          </View>
        </View>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  countdown: state.catalogos.countdown || {},
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton);
