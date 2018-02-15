import Colors from './colors';

export default {
  navbarProps: {
    navigationBarStyle: {
      backgroundColor: Colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderColor: Colors.black,
    },
    titleStyle: {
      alignSelf: 'center',
      letterSpacing: 2,
      fontSize: 15,
    },
    backButtonTintColor: Colors.black,
  },

  tabProps: {
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    activeTintColor: Colors.black,
  },

  topTabProps: {
    tabBarPosition: 'top',
    activeTintColor: Colors.white,
    inactiveTintColor: Colors.black,
    style: {
      backgroundColor: Colors.white,
      elevation: 0,
      shadowOpacity: 0,
      borderBottomWidth: 1,
      borderColor: Colors.black,
    },
    indicatorStyle: {
      backgroundColor: Colors.black,
      height: 100
    }
  },

  icons: {
    style: {
      color: Colors.black,
    },
  },
};
