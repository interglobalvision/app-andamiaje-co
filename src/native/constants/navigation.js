import Colors from '../../../native-base-theme/variables/commonColor';

export default {
  navbarProps: {
    navigationBarStyle: { backgroundColor: 'rgba(255,255,255,1)' },
    titleStyle: {
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: Colors.fontSizeBase,
    },
    backButtonTintColor: Colors.textColor,
  },

  tabProps: {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    activeTintColor: 'black',
  },

  topTabProps: {
    tabBarPosition: 'top',
    activeTintColor: 'black',
    inactiveTintColor: 'black',
    style: {
      backgroundColor: 'white',
    },
  },

  icons: {
    style: { color: 'black' },
  },
};
