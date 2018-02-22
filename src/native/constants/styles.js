import { StyleSheet, Dimensions } from 'react-native';
import colors from './colors';

const windowWidth = Dimensions.get('window').width;

// Calculate container padding
const containerPaddingPercentage = windowWidth > 500 ? 0.1 : 0.02;
const containerPadding = windowWidth * containerPaddingPercentage;

// Font sizes
const fontSizeBasic = 14;
const fontSizeSmall = 10;
const fontSizeMid = 21;
const fontSizeLarge = 28;

// Padding
const paddingBasic = 20;
const paddingSmall = paddingBasic / 2; // 10
const paddingMid = paddingBasic * 1.5; // 30
const paddingLarge = paddingBasic * 2; // 40

export default styles = StyleSheet.create({
  // Text
  fontSizeSmall: {
    fontSize: fontSizeSmall,
  },
  fontSizeMid: {
    fontSize: fontSizeMid,
  },
  fontSizeLarge: {
    fontSize: fontSizeLarge,
  },
  fontBold: {
    fontWeight: '800',
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
    paddingTop: paddingSmall,
  },
  paddingTopBasic: {
    paddingTop: paddingBasic,
  },
  paddingTopMid: {
    paddingTop: paddingMid,
  },
  paddingTopLarge: {
    paddingTop: paddingLarge,
  },
  paddingBottomSmall: {
    paddingBottom: paddingSmall,
  },
  paddingBottomBasic: {
    paddingBottom: paddingBasic,
  },
  paddingBottomMid: {
    paddingBottom: paddingMid,
  },
  paddingBottomLarge: {
    paddingBottom: paddingLarge,
  },
  // SectionHeader
  sectionHeader: {
    paddingTop: paddingMid,
    paddingBottom: paddingSmall,
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
    paddingTop: paddingBasic,
    paddingBottom: paddingBasic,
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    paddingLeft: 10,
    flex: 1,
  },
});
