import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
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
    <Stack key="main" {...DefaultProps.navbarProps}>
      <Tabs
        hideNavBar
        swipeEnabled
        type="replace"
        {...DefaultProps.tabProps}
      >
        <Stack key='noticias' title='NOTICIAS'>
          <Scene
            tabBarLabel='NOTICIAS'
            key='noticias'
            icon={() => <Icon name='book' {...DefaultProps.icons} />}
            component={NoticiasContainer}
            Layout={NoticiasList}
          />
        </Stack>
        <Stack key='directory' title='DIRECTORIO'>
          <Tabs
            key="directory"
            swipeEnabled
            type="replace"
            tabBarPosition='top'
            tabBarLabel='DIRECTORIO'
          >
            <Stack key='artistas' title='ARTISTAS'>
              <Scene
                key='artistas'
                tabBarLabel='ARTISTAS'
                component={ArtistasContainer}
                Layout={ArtistasList}
                icon={() => <Icon name='book' {...DefaultProps.icons} />}
              />
            </Stack>
          </Tabs>
        </Stack>
      </Tabs>
    </Stack>
  </Scene>
);

export default Index;
