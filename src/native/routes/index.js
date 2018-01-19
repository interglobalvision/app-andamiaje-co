import React from 'react';
import { Drawer, Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import NoticiasContainer from '../../containers/NoticiasContainer';
import NoticiasComponent from '../components/Noticias';

import RecipesContainer from '../../containers/Recipes';
import RecipesComponent from '../components/Recipes';
import RecipeViewComponent from '../components/Recipe';

import SignUpContainer from '../../containers/SignUp';
import SignUpComponent from '../components/SignUp';

import LoginContainer from '../../containers/Login';
import LoginComponent from '../components/Login';

import ForgotPasswordContainer from '../../containers/ForgotPassword';
import ForgotPasswordComponent from '../components/ForgotPassword';

import UpdateProfileContainer from '../../containers/UpdateProfile';
import UpdateProfileComponent from '../components/UpdateProfile';

import AppContainer from '../../containers/App';
import ProfileComponent from '../components/Profile';

import AboutComponent from '../components/About';

console.log(DefaultProps.tabProps);

const Index = (
  <Scene key="root">
    <Scene key='login' title='LOGIN' component={LoginContainer} Layout={LoginComponent} hideNavBar initial />

    <Stack key="main">
      <Scene hideNavBar>
        <Tabs
          key="tabbar"
          swipeEnabled
          type="replace"
          showLabel={false}
          {...DefaultProps.tabProps}
        >
          <Stack
            key='noticias'
            title='NOTICIAS'
            icon={() => <Icon name='book' {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Scene key='noticias' component={NoticiasContainer} Layout={NoticiasComponent} />
          </Stack>
        </Tabs>
      </Scene>
    </Stack>
  </Scene>
);

/*
<Stack
  {...DefaultProps.tabProps}
  key='main'
  >
  <Scene hideNavBar>
    <Tabs
      key='tabbar'
      swipeEnabled
      type='replace'
      showLabel={false}
      {...DefaultProps.tabProps}
    >
      <Stack
        key='noticias'
        title='NOTICIAS'
        icon={() => <Icon name='book' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key='noticias' component={NoticiasContainer} Layout={NoticiasComponent} />
      </Stack>

      <Stack
        key='home'
        title={AppConfig.appName.toUpperCase()}
        icon={() => <Icon name='planet' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key='home' component={AboutComponent} />
      </Stack>

      <Stack
        key='recipes'
        title='RECIPES'
        icon={() => <Icon name='book' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key='recipes' component={RecipesContainer} Layout={RecipesComponent} />
      </Stack>

      <Stack
        key='profile'
        title='PROFILE'
        icon={() => <Icon name='contact' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene key='profileHome' component={AppContainer} Layout={ProfileComponent} />
        <Scene
          back
          key='signUp'
          title='SIGN UP'
          {...DefaultProps.navbarProps}
          component={SignUpContainer}
          Layout={SignUpComponent}
        />
        <Scene
          back
          key='forgotPassword'
          title='FORGOT PASSWORD'
          {...DefaultProps.navbarProps}
          component={ForgotPasswordContainer}
          Layout={ForgotPasswordComponent}
        />
        <Scene
          back
          key='updateProfile'
          title='UPDATE PROFILE'
          {...DefaultProps.navbarProps}
          component={UpdateProfileContainer}
          Layout={UpdateProfileComponent}
        />
      </Stack>
    </Tabs>
  </Scene>

  <Scene
    back
    clone
    key='recipe'
    title='RECIPE'
    {...DefaultProps.navbarProps}
    component={RecipesContainer}
    Layout={RecipeViewComponent}
  />
</Stack>
);
*/

export default Index;
