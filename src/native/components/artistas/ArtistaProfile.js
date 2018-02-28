import React from 'react';
import { ScrollView, View, Image, Dimensions, Text, Linking, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';
import Thumbnail from 'react-native-thumbnail-video';

import ArtistaPortfolio from './ArtistaPortfolio';
import SectionHeader from '../SectionHeader';
import { getResizedImageUrl } from '../../../lib/utilities';

import styles, { containerWidth } from '../../constants/styles';

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

  let imageSource = require('../../../images/placeholder.png');

  if (images !== undefined) {
    imageSource = {uri: getResizedImageUrl(images[0], 350, true)};
  }

  const onPressCv = cvRawContent => {
    Actions.artistaCv({content: cvRawContent})
  }

  const hasVideo = video.url !== undefined && video.url !== '' && video.provider === 'youtube';

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
          <Image source={imageSource} style={[styles.profileAvatarImage]} />
        </View>
        <View style={[styles.profileHeaderTextHolder]}>
          { name !== 'undefined' ? <View><Text style={[styles.fontBold, styles.fontSizeMid]}>{name}</Text></View>  : null }
          { country !== 'undefined' ? <Text style={[styles.fontSizeSmall, styles.paddingBottomSmall]}>{country}</Text>  : null }
          { gallery !== 'undefined' ?
            <TouchableOpacity onPress={ () => Linking.openURL(galleryUrl) }>
              <Text style={[styles.fontSizeSmall, styles.textLink]}>{gallery}</Text>
            </TouchableOpacity>
          : null }
          { websiteUrl !== 'undefined' ?
            <TouchableOpacity onPress={ () => Linking.openURL(websiteUrl) }>
              <Text style={[styles.fontSizeSmall, styles.textLink]} numberOfLines={1} ellipsizeMode={'tail'}>{websiteUrl}</Text>
            </TouchableOpacity>
          : null }
        </View>
      </View>

      <View style={[
        styles.container,
        styles.paddingTopBasic,
        styles.paddingBottomSmall,
        styles.bordered,
      ]}>
        <DraftContentRenderer rawContent={bioRawContent} />
      </View>

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

      { hasVideo
        ? <View>
            <SectionHeader title={'Video'} />
            <View style={[
              styles.container,
              styles.paddingTopSmall,
              styles.paddingBottomLarge,
            ]}>
              <Thumbnail
                url={video.url}
                imageWidth={containerWidth}
                imageHeight={((containerWidth / 16) * 9)}
                iconStyle={{width: 25, height: 29}}
              />
            </View>
          </View>
        : null
      }

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
