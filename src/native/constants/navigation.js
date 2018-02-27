import colors from './colors';
import styleConstants from './styleConstants';

export default {
  navbarProps: {
    navigationBarStyle: {
      backgroundColor: colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderTopWidth: 1,
      borderTopColor: colors.lightGrey,
    },
    titleStyle: {
      alignSelf: 'center',
      fontSize: styleConstants.fontSizeBasic,
      fontFamily: styleConstants.fontFamilyMedium,
    },
    backButtonTintColor: colors.black,
  },

  tabProps: {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    activeTintColor: colors.black,
    tabBarStyle: {
      backgroundColor: colors.white,
    },
  },

  topTabProps: {
    tabBarPosition: 'top',
    activeTintColor: colors.white,
    inactiveTintColor: colors.black,
    style: {
      backgroundColor: colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderColor: colors.lightGrey,
    },
    indicatorStyle: {
      backgroundColor: colors.black,
      height: 100
    }
  },

  icons: {
    style: {
      color: colors.black,
    },
  },
};
