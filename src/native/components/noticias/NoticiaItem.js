import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableOpacity, Text, Dimensions } from 'react-native';
import Thumbnail from 'react-native-thumbnail-video';
import { distanceInWordsToNow } from 'date-fns';
import es from 'date-fns/locale/es';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { Actions } from 'react-native-router-flux';

import styles, { containerWidth } from '../../constants/styles';
import { getResizedImageUrl, getBestImageSize, getScaledImageDimensions } from '../../../lib/utilities';
import TextBullet from '../TextBullet';
import colors from '../../constants/colors';
import Spacer from '../Spacer';

const onPress = id => Actions.artista({ match: { params: { id: String(id) } } });

const customStyles = StyleSheet.flatten({
  unstyled: {
    fontSize: styleConstants.fontSizeBasic,
    marginBottom: styleConstants.paddingSmall,
    lineHeight: styleConstants.lineHeightParagraph,
  },
  bold: {
    fontWeight: 'normal',
    fontFamily: styleConstants.fontFamilyMedium,
  },
  italic: {
    fontStyle: 'normal',
    fontFamily: styleConstants.fontFamilyItalic,
  },
  link: {
    color: colors.darkGrey,
    fontWeight: styleConstants.fontWeightBold,
  },
  paragraph: {
    paddingBottom: styleConstants.paddingLarge,
  }
});

const renderArtista = (item) => {
  if (item.artista !== undefined) {
    return (
      <TouchableOpacity onPress={() => onPress(item.artista.id)}  style={styles.paddingBottomMid}>
        <Text style={[styles.textLink, styles.fontSizeSmall]}>Ver el bio de {item.artista.name}</Text>
      </TouchableOpacity>
    );
  }
  return null;
}

const NoticiaItem = ({item, border}) => {

  let holderStyle = [
    styles.container,
    styles.backgroundWhite,
    styles.paddingTopMid,
    styles.paddingBottomLarge
  ];
  if (border) {
    holderStyle.push(styles.bordered);
  }

  // Parse content
  const contentState = JSON.parse(item.rawContent);

  const draftParams = {
    contentState,
    customStyles,
  };

  // function to check if it has video
  const hasVideo = item.video.url !== undefined && item.video.url !== '' && item.video.provider === 'youtube';

  // Check for image
  let imageSize;
  let imageSrc;
  let imageDimensions;

  if (item.images !== undefined && item.images.length && !hasVideo) {
    const image = item.images[0];
    const windowWidth = Dimensions.get('window').width;
    imageSize = getBestImageSize();
    console.log(imageSize);
    imageSrc = getResizedImageUrl(image, imageSize);
    imageDimensions = getScaledImageDimensions(image.width, image.height);
  }

  return (
    <View style={holderStyle}>
      <View style={styles.paddingBottomBasic}>
        <Text>
          <Text style={[styles.fontBold, styles.fontSizeMid ]}>{item.title}</Text><TextBullet /><Text style={[styles.fontSizeSmall]}>{distanceInWordsToNow(item.publishDate, { locale: es })}</Text>
        </Text>
      </View>

      <View style={styles.paddingBottomMid}>{getRNDraftJSBlocks(draftParams)}</View>

      {renderArtista(item)}

      { hasVideo ? <Thumbnail url={item.video.url} imageWidth={containerWidth} imageHeight={((containerWidth / 16) * 9)} iconStyle={{width: 25, height: 29}} /> : null }

      { imageSrc !== null && !hasVideo ?
        <Image
          source={{ uri: imageSrc, cache: 'force-cache' }}
          style={{
            width: imageDimensions.width,
            height: imageDimensions.height
          }}
        /> : null }
    </View>
  );
}

export default NoticiaItem;
