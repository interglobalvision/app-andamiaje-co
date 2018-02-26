import React from 'react';
import { ScrollView, View, Image, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';

import ArtistaPortfolio from './ArtistaPortfolio';

import { getResizedImageUrl } from '../../../lib/utilities';

import styles from '../../constants/styles';

import Loading from '../Loading';
import Error from '../Error';

const ArtistaProfile = ({
	error,
  loading,
	artistas,
	artistaId,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  // Get this artista from all artistas
  let artista = null;

  if (artistaId && artistas) {
    artista = artistas.find(item => item.id === artistaId);
  }

  const placeholder = 'http://via.placeholder.com/50x50';

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
    cvRawContent,
  } = artista;

  const imageSrc = images !== undefined ? getResizedImageUrl(images[0], 350, true) : placeholder;

  const onPressCv = cvRawContent => {
    Actions.artistaCv({content: cvRawContent})
  }

	return (
    <ScrollView style={[styles.backgroundWhite]}>
      <View style={[
        styles.container,
        styles.bordered,
        styles.flexRow,
        styles.paddingTopBasic,
        styles.paddingBottomBasic,
      ]}>
        <View>
          <Image source={{ uri: imageSrc }} style={[styles.profileAvatarImage]} />
        </View>
        <View style={[styles.profileHeaderTextHolder]}>
          { name !== 'undefined' ? <View style={[styles.paddingBottomSmall]}><Text style={[styles.fontBold, styles.fontSizeMid]}>{name}</Text></View>  : '' }
          { country !== 'undefined' ? <Text style={[styles.fontSizeSmall]}>{country}</Text>  : '' }
          { gallery !== 'undefined' ? <Text style={[styles.fontSizeSmall]}>{gallery}</Text>  : '' }
        </View>
      </View>
      <DraftContentRenderer rawContent={bioRawContent} />

      <TouchableOpacity
        style={[
          styles.flexRow,
          styles.paddingTopBasic,
          styles.paddingBottomBasic,
          styles.bordered,
          styles.container,
          {
            alignItems: 'center'
          }
        ]}
        onPress={() => onPressCv(cvRawContent)}
      >
        <View style={{ flex: 1 }}><Text>CV</Text></View>
        <View>
          <Image source={require('../../../images/icons/icon-open-page.png')} style={{width: 6, height: 12}} />
        </View>
      </TouchableOpacity>

      <ArtistaPortfolio portfolio={portfolio} name={name} />
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
