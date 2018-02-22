import React from 'react';
import { ScrollView, View, Image, Dimensions, Text } from 'react-native';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';

import ArtistaPortfolio from './ArtistaPortfolio';

import { getResizedImageUrl } from '../../../lib/utilities';

import Spacer from '../Spacer';

const ArtistaProfile = ({
	error,
	artistas,
	artistaId,
}) => {

  // Get this artista from all artistas
  let artista = null;

  if (artistaId && artistas) {
    artista = artistas.find(item => item.id === artistaId);
  }

  const placeholder = 'http://via.placeholder.com/50x50';

  const {width, height} = Dimensions.get('window')

  const {
    name,
    images,
    country,
    gallery,
    galleryUrl,
    websiteUrl,
    portfolio,
    video,
    bioRawContent,
  } = artista;

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
          { name !== 'undefined' ? <Text>{name}</Text>  : '' }
          { country !== 'undefined' ? <Text>{country}</Text>  : '' }
          { gallery !== 'undefined' ? <Text>{gallery}</Text>  : '' }
          <Spacer />
        </View>
      </View>
      <DraftContentRenderer rawContent={bioRawContent} />
      <ArtistaPortfolio portfolio={portfolio} />
    </ScrollView>
	);
};

ArtistaProfile.propTypes = {
	error: PropTypes.string,
	artistaId: PropTypes.string.isRequired,
	artistas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ArtistaProfile.defaultProps = {
	error: null,
};

export default ArtistaProfile;
