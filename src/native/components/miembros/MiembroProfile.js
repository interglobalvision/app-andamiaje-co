import React from 'react';
import { ScrollView, View, Image, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';

import { getResizedImageUrl } from '../../../lib/utilities';

import MiembroCollection from './MiembroCollection';

import Spacer from '../Spacer';

const MiembroProfile = ({
	error,
	miembros,
	miembroId,
  member,
}) => {
  // Get this miembro from all miembros
  let miembro = null;

  if (miembroId && miembros) {
    miembro = miembros.find(item => item.id === miembroId);
  }

  const placeholder = 'http://via.placeholder.com/100x100';

  const {width, height} = Dimensions.get('window')

  const {
    displayName,
    images,
    collection,
  } = miembro;

  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

	return (
    <ScrollView>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View>
          <Spacer />
          <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100, borderRadius: 50 }} />
          <Spacer />
        </View>
        <View style={{ paddingLeft: 10 }}>
          <Spacer />
          { displayName !== 'undefined' ? <Text>{displayName}</Text>  : '' }
          <Spacer />
        </View>
      </View>
      <MiembroCollection miembroId={miembroId} memberId={member.uid} collection={collection}/>
    </ScrollView>
	);
};

MiembroProfile.propTypes = {
	error: PropTypes.string,
	miembroId: PropTypes.string.isRequired,
	miembros: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  member: PropTypes.object.isRequired,
};

MiembroProfile.defaultProps = {
	error: null,
};

export default MiembroProfile;
