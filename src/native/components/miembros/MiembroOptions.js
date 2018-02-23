import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { logout } from '../../../actions/member';
import styles from '../../constants/styles';

import acercaDeAndamiaje from '../../constants/optionsContent/acercaDeAndamiaje'
import terminosYCondiciones from '../../constants/optionsContent/terminosYCondiciones'
import politicaDePrivacidad from '../../constants/optionsContent/politicaDePrivacidad'

import Loading from '../Loading';
import Error from '../Error';

const MiembroOptions = ({
  member,
}) => {

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => {Actions.acercaDeAndamiaje({content: acercaDeAndamiaje})}}>
        <Text>Acerca de Andamiaje</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Actions.terminosYCondiciones({content: terminosYCondiciones})}}>
        <Text>Términos y Condiciones</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Actions.politicaDePrivacidad({content: politicaDePrivacidad})}}>
        <Text>Política de privacidad</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={logout}>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

MiembroOptions.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MiembroOptions;
