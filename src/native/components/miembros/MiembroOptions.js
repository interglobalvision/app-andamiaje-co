import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';

const MiembroOptions = ({
  member,
}) => {

  const content = 'Lorem ipsum';

  return (
    <ScrollView>
      <TouchableOpacity onPress={() => {Actions.acercaDeAndamiaje({content: content})}}>
        <Text>Acerca de Andamiaje</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Actions.terminosYCondiciones({content: content})}}>
        <Text>Términos y Condiciones</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => {Actions.politicaDePrivacidad({content: content})}}>
        <Text>Política de privacidad</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

MiembroOptions.propTypes = {
  member: PropTypes.object.isRequired,
};

export default MiembroOptions;
