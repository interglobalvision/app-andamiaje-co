import React from 'react';
import { Drawer, Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import NoticiasContainer from '../../containers/NoticiasContainer';
import NoticiasList from '../components/Noticias';

import ArtistasContainer from '../../containers/ArtistasContainer';
import ArtistasList from '../components/Artistas';

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

// react-native-router-flux API docs
// https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md

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
            <Scene key='noticias' component={NoticiasContainer} Layout={NoticiasList}/>
          </Stack>
          <Stack
            key='directorio'
            title='DIRECTORIO'
            icon={() => <Icon name='book' {...DefaultProps.icons} />}
            {...DefaultProps.navbarProps}
          >
            <Tabs
              key="directoriotabs"
              swipeEnabled
              tabBarPosition="top"
              showLabel={true}
            >
              <Scene tabBarLabel='ARTISTAS' key='artistas' component={ArtistasContainer} Layout={ArtistasList}/>
            </Tabs>
          </Stack>
        </Tabs>
      </Scene>
    </Stack>
  </Scene>
);

export default Index;
