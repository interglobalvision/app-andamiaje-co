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

export const containerWidth = windowWidth - (containerPadding * 2);

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
  fontItalic: {
    fontFamily: styleConstants.fontFamilyItalic,
  },
  fontBold: {
    fontFamily: styleConstants.fontFamilyMedium,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textLink: {
    color: colors.darkGrey,
    fontFamily: styleConstants.fontFamilyMedium,
  },
  colorWhite: {
    color: colors.white,
  },
  colorBlack: {
    color: colors.black,
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
  backgroundBlack: {
    backgroundColor: colors.black,
  },
  emptyItemsHeight: {
    height: 300,
  },
  toast: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
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
  paddingTopTiny: {
    paddingTop: styleConstants.paddingTiny,
  },
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
  paddingBottomTiny: {
    paddingBottom: styleConstants.paddingTiny,
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
  directoryImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  directoryImageCurrent: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
  }
});
