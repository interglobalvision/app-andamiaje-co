import React from 'react';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { View, StyleSheet } from 'react-native';
import colors from '../constants/colors';
import styleConstants from '../constants/styleConstants';
import styles from '../constants/styles';

const customStyles = StyleSheet.flatten({
  unstyled: {
    fontSize: styleConstants.fontSizeBasic,
    marginBottom: styleConstants.paddingSmall,
    lineHeight: styleConstants.lineHeightBasic,
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
  },
});

const DraftContentRenderer = ({ rawContent }) => {
  const contentState = JSON.parse(rawContent);

  const params = {
    contentState,
    customStyles,
  };

  const blocks = getRNDraftJSBlocks(params);

  return (
    <View>
      {blocks}
    </View>
  );
};

export default DraftContentRenderer;
