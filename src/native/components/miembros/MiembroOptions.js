import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, Text, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from '../../constants/styles';

import acercaDeAndamiaje from '../../constants/optionsContent/acercaDeAndamiaje'
import terminosYCondiciones from '../../constants/optionsContent/terminosYCondiciones'
import politicaDePrivacidad from '../../constants/optionsContent/politicaDePrivacidad'

import Loading from '../Loading';
import Error from '../Error';

const MiembroOptions = ({
  member,
  logout,
}) => {

  const optionStyle = [
    styles.flexRow,
    styles.paddingTopBasic,
    styles.paddingBottomBasic,
    styles.container,
    {
      alignItems: 'center'
    }
  ]

  return (
    <ScrollView style={[styles.backgroundWhite]}>
      <View style={[
        styles.bordered,
      ]}>
        <TouchableOpacity onPress={() => {Actions.acercaDeAndamiaje({content: acercaDeAndamiaje})}} style={optionStyle}>
          <View style={{ flex: 1 }}><Text>Acerca de Andamiaje</Text></View>
          <View>
            <Image source={require('../../../images/icons/icon-open-page.png')} style={{width: 6, height: 12}} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[
        styles.bordered,
      ]}>
        <TouchableOpacity onPress={() => {Actions.politicaDePrivacidad({content: politicaDePrivacidad})}} style={optionStyle}>
          <View style={{ flex: 1 }}><Text>Política de privacidad</Text></View>
          <View>
            <Image source={require('../../../images/icons/icon-open-page.png')} style={{width: 6, height: 12}} />
          </View>
        </TouchableOpacity>
      </View>

      <View style={[
        styles.bordered,
      ]}>
        <TouchableOpacity onPress={logout} style={optionStyle}>
          <Text>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

MiembroOptions.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MiembroOptions;
