import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';
import styleConstants from './styleConstants';

const windowWidth = Dimensions.get('window').width;

// Calculate container padding
const containerPaddingPercentage = windowWidth > 500 ? 0.05 : 0.02;
const containerPadding = windowWidth * containerPaddingPercentage;

// Calculate Carousel styles
const carouselBulletsPaddingTop = styleConstants.paddingMid;
const carouselHeight = windowWidth + carouselBulletsPaddingTop;

export default styles = StyleSheet.create({
  // Text
  fontSizeSmall: {
    fontSize: styleConstants.fontSizeSmall,
  },
  fontSizeMid: {
    fontSize: styleConstants.fontSizeMid,
  },
  fontSizeLarge: {
    fontSize: styleConstants.fontSizeLarge,
  },
  lineHeightBasic: {
    lineHeight: styleConstants.lineHeightBasic,
  },
  lineHeightParagraph: {
    lineHeight: styleConstants.lineHeightParagraph,
  },
  fontItalic: {
    fontStyle: 'italic',
  },
  fontBold: {
    fontWeight: styleConstants.fontWeightBold,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  colorWhite: {
    color: colors.white,
  },
  // Basic
  bordered: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: colors.lightGrey,
  },
  container: {
    paddingLeft: containerPadding,
    paddingRight: containerPadding,
    backgroundColor: colors.white,
  },
  backgroundWhite: {
    backgroundColor: colors.white,
  },
  // Flex
  flexRow: {
    flexDirection: 'row',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Padding
  paddingTopSmall: {
    paddingTop: styleConstants.paddingSmall,
  },
  paddingTopBasic: {
    paddingTop: styleConstants.paddingBasic,
  },
  paddingTopMid: {
    paddingTop: styleConstants.paddingMid,
  },
  paddingTopLarge: {
    paddingTop: styleConstants.paddingLarge,
  },
  paddingBottomSmall: {
    paddingBottom: styleConstants.paddingSmall,
  },
  paddingBottomBasic: {
    paddingBottom: styleConstants.paddingBasic,
  },
  paddingBottomMid: {
    paddingBottom: styleConstants.paddingMid,
  },
  paddingBottomLarge: {
    paddingBottom: styleConstants.paddingLarge,
  },
  // SectionHeader
  sectionHeader: {
    paddingTop: styleConstants.paddingMid,
    paddingBottom: styleConstants.paddingSmall,
    flex: 1,
  },
  // CalendarItem
  calendarItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    alignItems: 'center',
    height: 100,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderBottomColor: colors.white,
    backgroundColor: colors.black,
  },
  calendarLabel: {
    flex: 1,
    color: 'white'
  },
  calendarDate: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    flexBasis: 100,
  },
  // LoteHeader
  loteHeader: {
    paddingTop: styleConstants.paddingBasic,
    paddingBottom: styleConstants.paddingBasic,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  // Carousel
  carousel: {
    width: windowWidth,
    height: carouselHeight,
  },
  carouselBullets: {
    paddingTop: carouselBulletsPaddingTop,
  },
  // WishlistItem
  wishlistImageHolder: {
    flexBasis: 100,
  },
  wishlistImage: {
    width: 100,
    height: 100,
  },
  wishlistTextHolder: {
    paddingLeft: styleConstants.paddingSmall,
    flex: 1,
  },
  // Directory
  directoryImageHolder: {
    flexBasis: 50,
  },
  directoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  directoryTextHolder: {
    paddingLeft: styleConstants.paddingSmall,
    flex: 1,
  },
  // Profile
  profileAvatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  profileHeaderTextHolder: {
    paddingLeft: styleConstants.paddingSmall,
    flex: 1,
  },
});
