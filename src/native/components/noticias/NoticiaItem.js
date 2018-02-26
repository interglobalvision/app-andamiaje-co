import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { distanceInWordsToNow } from 'date-fns';
import es from 'date-fns/locale/es';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { Actions } from 'react-native-router-flux';
import styles from '../../constants/styles';
import TextBullet from '../TextBullet';
import colors from '../../constants/colors';

import ResponsiveImageView from 'react-native-responsive-image-view';

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
        <Text style={styles.colorDarkGrey, styles.fontSizeSmall}>Ver el bio de {item.artista.name}</Text>
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

  const contentState = JSON.parse(item.rawContent);

  const draftParams = {
    contentState,
    customStyles,
  };

  return (
    <View style={holderStyle}>
      <View style={styles.paddingBottomBasic}>
        <Text>
          <Text style={[styles.fontBold, styles.fontSizeMid ]}>{item.title}</Text><TextBullet /><Text style={[styles.fontSizeSmall]}>{distanceInWordsToNow(item.publishDate, { locale: es })}</Text>
        </Text>
      </View>

      <View style={styles.paddingBottomMid}>{getRNDraftJSBlocks(draftParams)}</View>

      {renderArtista(item)}

      { item.images !== undefined && item.images.length ?
        <ResponsiveImageView
          source={{ uri: item.images[0].downloadURL}}
          render={({ getViewProps, getImageProps }) => (
            <View {...getViewProps()}>
              <Image {...getImageProps()} />
            </View>
          )}
        /> : '' }
    </View>
  );
}

export default NoticiaItem;
