import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { connect } from 'react-redux';
import { Firebase, FirebaseRef } from '../../lib/firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

import { showNotification } from '../../actions/toastActions';
import styles, { containerWidth } from '../constants/styles';
import { CloudFunctionsUrl } from '../../constants/functions';
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

    this.resetButton = this.resetButton.bind(this);
  }

  onPressIn = () => {
    if (!this.state.complete) {
      const duration = 2000;

      this.pressTimeout = setTimeout(this.confirmBuy, duration);

      this.view.transition({
          right: 0,
        }, {
          right: containerWidth,
        },
        duration,
        'ease-in'
      );
    }
  }

  onPressOut = () => {
    if (!this.state.complete) {
      this.view.transitionTo({
          right: 0,
        },
        100,
        'linear'
      );

      clearTimeout(this.pressTimeout);
    }
  }

  onPressOwner = id => Actions.miembro({ match: { params: { id: String(id) } } });

  acquireLote = () => {

    const { Firebase, FirebaseRef, showNotification, lote } = this.props;

    // acquire lote function url
    const acquireLoteFunction = CloudFunctionsUrl + '/acquireLote';

    Firebase.auth().currentUser.getIdToken()

      .then(idToken => {
        // Call acquire lote function
        return axios.get(acquireLoteFunction, {
          params: {
            lote: lote.id,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': idToken,
          },
          mode: 'no-cors'
        })

      })

      .then(response => {

        if (response.status === 200) {

          if(lote.obras.length === 1) {
            showNotification('¡Has adquirido esta obra!');
          } else {
            showNotification('¡Has adquirido estas obras!');
          }

          // TODO show confetti
        }
      })


      .catch(error => {
        // Error
        if (error.response) {
          if(error.response.data.error) {
            switch (error.response.data.error) {
              case 'loteId/undefined':
                showNotification('ID incorrecto');
                this.resetButton();
                break;
              case 'lote/has-owner':
                if(lote.obras.length === 1) {
                  showNotification('Esta obra ya tiene dueño');
                } else {
                  showNotification('Estas obras ya tienen dueño');
                }
                this.resetButton();
                break;
              case 'lote/too-expensive':
                showNotification('No tienes suficientes tokens');
                break;
              case 'unauthorized':
                showNotification('No puedes realizar esta acción');
                this.resetButton();
                break;
              default:
                showNotification('Ha sucedido un error');
                this.resetButton();
                break;
            }
          }
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
          showNotification('Ha sucedido un error');
          this.resetButton();
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
          showNotification('Ha sucedido un error');
          this.resetButton();
        }

        console.log(error.config);

      })

      .catch(e => {
        console.log(e);

        showNotification('Ha sucedido un error');
        this.resetButton();
      });

  }

  confirmBuy = () => {
    clearTimeout(this.pressTimeout);

    this.setState({
      complete: true,
      buttonText: 'Adquiriendo…'
    });

    this.acquireLote();
  }

  resetButton = (message = 'Mantener presionado para adquirir') => {

    // This horrible check is an ugly fix to avoid trying to
    // transform the button after it has unmounted
    if(this !== null
      && this.view !== null
      && this.view.transitionTo !== undefined
      && this.view.transitionTo !== null) {
      this.view.transitionTo({
        right: 0,
      },
        100,
        'linear'
      );

      this.setState({
        complete: false,
        buttonText: message,
      });
    }
  }

  handleViewRef = ref => this.view = ref;

  render = () => {
    const { lote } = this.props;
    const { owner } = lote;
    const { saleStarted, saleEnded } = this.props.countdown;

    if (owner !== undefined && (saleStarted || saleEnded)) {
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
            ]}>Adquirida por { owner.name }</Text>
          </View>
        </View>
      );
    } else if (saleStarted) {
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
    } else if (owner !== undefined) {
      return (
        <TouchableOpacity
        onPress={() => this.onPressOwner(owner.uid)}
        style={[
          styles.container,
          styles.paddingTopBasic,
          styles.paddingBottomSmall,
        ]}>
          <Text style={[
            styles.textLink,
          ]}>Colección de { owner.name }</Text>
        </TouchableOpacity>
      );
    }
    return null;
  }
}

const mapStateToProps = state => ({
  Firebase,
  FirebaseRef,
  countdown: state.catalogos.countdown || {},
});

const mapDispatchToProps = (dispatch) => ({
  showNotification: (message) => showNotification(dispatch, message),
});

export default connect(mapStateToProps, mapDispatchToProps)(BuyButton);
