import React from 'react';
import { ScrollView, View, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { Container, Content, Card, CardItem, Body, H3, List, ListItem, Text } from 'native-base';
import DraftContentRenderer from '../DraftContentRenderer';

import { getResizedImageUrl } from '../../../lib/utilities';

const ArtistProfile = ({
	error,
	artistas,
	artistaId,
}) => {
  console.log(artistaId);

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
      <View style={{ flex: 1, flexDirection: 'row'}}>
        <View>
          <Image source={{ uri: imageSrc }} style={{ width: 100, height: 100, borderRadius: 50 }} />
        </View>
        <View style={{ paddingLeft: 10 }}>
          { name !== 'undefined' ? <Text>{name}</Text>  : '' }
          { country !== 'undefined' ? <Text>{country}</Text>  : '' }
          { gallery !== 'undefined' ? <Text>{gallery}</Text>  : '' }
        </View>
      </View>
      <DraftContentRenderer rawContent={bioRawContent} />
    </ScrollView>
	);
};

ArtistProfile.propTypes = {
	error: PropTypes.string,
	artistaId: PropTypes.string.isRequired,
	artistas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

ArtistProfile.defaultProps = {
	error: null,
};

export default ArtistProfile;
