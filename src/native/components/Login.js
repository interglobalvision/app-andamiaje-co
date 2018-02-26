import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import Loading from './Loading';
import Messages from './Messages';

import styles from '../constants/styles';
import styleConstants from '../constants/styleConstants';
import colors from '../../native/constants/colors';

class Login extends React.Component {
  static propTypes = {
    member: PropTypes.shape({
      email: PropTypes.string,
    }),
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    onFormSubmit: PropTypes.func.isRequired,
  }

  static defaultProps = {
    error: null,
    member: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      email: (props.member && props.member.email) ? props.member.email : '',
      password: '',
      showPassword: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (name, val) => {
    this.setState({
      ...this.state,
      [name]: val,
    });
  }

  handleSubmit = () => {
    this.props.onFormSubmit(this.state)
      .then(() => {
        // Redirect to `main` and reset navigation stack so user can't "back" to login
        Actions.reset('main');
      })
      .catch(e => console.log(`Error: ${e}`));
  }

  checkIfLogged(member) {
    // Redirect if already logged in
    if (member !== undefined && member.uid) {
      // Redirect to `main` and reset navigation stack so user can't "back" to login
      Actions.reset('main', this.props);
    }
  }

  componentDidMount() {
    const { member } = this.props;
    this.checkIfLogged(member);
  }

  componentWillUpdate({ member }) {
    this.checkIfLogged(member);
  }


  render() {
    const { loading, error } = this.props;
    const eyeVisibleSource = require('../../images/icons/icon-eye-visible.png');
    const eyeHiddenSource = require('../../images/icons/icon-eye-hidden.png');

    // Loading
    if (loading) return <Loading />;

    return (
      <ScrollView scrollEnabled={false}
        contentContainerStyle={[
          styles.container,
          styles.backgroundWhite,
          styles.fullScreen,
          {
            justifyContent: 'center',
            alignItems: 'center',
          }
        ]}
      >
        <View style={[
          {
            width: 300,
          }
        ]}>
          <View style={[styles.paddingBottomMid]}>
            <Image source={require('../../images/andamiaje-logo-login.png')} style={{width: 300, height: 63.5}} />
          </View>

          <View style={[
            styles.paddingBottomSmall,
          ]}>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              value={this.state.email}
              keyboardType="email-address"
              style={[
                styles.paddingTopSmall,
                styles.paddingBottomSmall,
                {
                  borderBottomColor: colors.black,
                  borderBottomWidth: 1,
                }
              ]}
              onChangeText={v => this.handleChange('email', v)}
            />
          </View>
          <View style={[
            styles.paddingBottomSmall,
            styles.flexNowrap,
            styles.flexRow,
            {
              alignItems: 'center',
            }
          ]}>
            <TextInput
              placeholder="Contraseña"
              secureTextEntry={ this.state.showPassword }
              style={[
                styles.paddingTopSmall,
                styles.paddingBottomSmall,
                {
                  borderBottomColor: colors.black,
                  borderBottomWidth: 1,
                  flexGrow: 1,
                }
              ]}
              onChangeText={v => this.handleChange('password', v)}
            />
            <TouchableOpacity
              onPress={() => {this.setState(prevState => ({
                  showPassword: !prevState.showPassword
                }));
              }}
              style={[
                styles.flexCenter,
                {
                  flexBasis: 50,
                }
              ]}
            >
              { this.state.showPassword
                ? <Image source={eyeVisibleSource} style={{width: 34, height: 25}} />
                : <Image source={eyeHiddenSource} style={{width: 34, height: 25}} />
              }
            </TouchableOpacity>
          </View>
          <View style={[
            styles.paddingTopMid,
          ]}>
            <TouchableOpacity onPress={this.handleSubmit} style={[
              {
                backgroundColor: colors.black,
                padding: styleConstants.paddingBasic,
                borderRadius: 5
              }
            ]}>
              <Text style={{
                textAlign: 'center',
                color: colors.white,
              }}>Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
          {error && <Messages message={error} />}
        </View>
        <KeyboardSpacer/>
      </ScrollView>
    );
  }
}

export default Login;
