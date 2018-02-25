import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';
import styleConstants from './styleConstants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// Calculate container padding
const containerPaddingPercentage = windowWidth > 500 ? 0.05 : 0.03;
const containerPadding = windowWidth * containerPaddingPercentage;

// Calculate Carousel styles
const carouselBulletsPaddingTop = styleConstants.paddingBasic;
const carouselHeight = windowWidth + carouselBulletsPaddingTop + styleConstants.paddingBasic;
const carouselBulletDiameter = 5;

export default styles = StyleSheet.create({
  // Font family:
  fontFamilyRegular: {
    fontFamily: styleConstants.fontFamilyRegular,
  },
  fontFamilyItalic: {
    fontFamily: styleConstants.fontFamilyItalic,
  },
  fontFamilyMedium: {
    fontFamily: styleConstants.fontFamilyMedium,
  },
  defaultText: {
    fontFamily: styleConstants.fontFamilyRegular,
    fontSize: styleConstants.fontSizeBasic,
    color: colors.black,
  },
  // Text
  fontSizeTiny: {
    fontSize: styleConstants.fontSizeTiny,
  },
  fontSizeSmall: {
    fontSize: styleConstants.fontSizeSmall,
  },
  fontSizeBasic: {
    fontSize: styleConstants.fontSizeBasic,
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
    fontFamily: styleConstants.fontFamilyItalic,
  },
  fontBold: {
    fontFamily: styleConstants.fontFamilyMedium,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  colorWhite: {
    color: colors.white,
  },
  colorDarkGrey: {
    color: colors.darkGrey,
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
  },
  backgroundWhite: {
    backgroundColor: colors.white,
  },
  emptyItemsHeight: {
    height: 300,
  },
  fullScreen: {
    height: windowHeight,
    width: windowWidth,
  },
  // Flex
  flexRow: {
    flexDirection: 'row',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexNowrap: {
    flexWrap: 'nowrap',
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
    flexBasis: 70,
  },
  // Carousel
  carousel: {
    width: windowWidth,
    height: carouselHeight,
  },
  carouselBulletsContainer: {
    paddingTop: carouselBulletsPaddingTop,
  },
  carouselBulletStyle: {
    borderColor: 'black',
    width: carouselBulletDiameter,
    height: carouselBulletDiameter,
  },
  carouselChosenBulletStyle: {
    backgroundColor: 'black',
    width: carouselBulletDiameter,
    height: carouselBulletDiameter,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
    height: windowWidth,
    backgroundColor: colors.white,
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
    paddingLeft: styleConstants.paddingBasic,
    flex: 1,
  },
});
