import React from 'react';
import { ScrollView, View, Image, Dimensions, Text, Linking, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import DraftContentRenderer from '../DraftContentRenderer';
import ArtistaPortfolio from './ArtistaPortfolio';
import ArtistaVideo from './ArtistaVideo';
import { getResizedImageUrl } from '../../../lib/utilities';
import styles from '../../constants/styles';
import Loading from '../Loading';
import Error from '../Error';
import WishlistContainer from '../../../containers/WishlistContainer'
import ArtistaLotes from './ArtistaLotes'
import ArtistaBio from './ArtistaBio'
import Toast from '../Toast';
import Confetti from '../Confetti';

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

	return (
    <View style={{flex: 1}}>
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

        <ArtistaBio bioRawContent={bioRawContent} />

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

        <ArtistaVideo video={video} />

        <WishlistContainer Layout={ArtistaLotes} artistaId={artistaId} />

        <ArtistaPortfolio portfolio={portfolio} name={name} />
      </ScrollView>
      <Confetti />
      <Toast />
    </View>
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
