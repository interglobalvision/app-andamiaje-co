import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import NoticiasContainer from '../../containers/NoticiasContainer';
import Noticias from '../components/noticias/Noticias';

import CatalogosContainer from '../../containers/CatalogosContainer';
import CatalogosList from '../components/Catalogos';

import ArtistasContainer from '../../containers/ArtistasContainer';
import ArtistasList from '../components/Artistas';
import ArtistaProfile from '../components/artistas/ArtistaProfile';

import MiembrosContainer from '../../containers/MiembrosContainer';
import MiembrosList from '../components/Miembros';

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
    <Tabs
      key='main'
      lazy={true}
      {...DefaultProps.tabProps}
      hideNavBar
    >
      <Stack
        title='Noticias'
        icon={() => <Icon name='book' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene
          key='noticias'
          title='Noticias'
          initial
          component={NoticiasContainer}
          Layout={Noticias}
        />
      </Stack>
      <Stack
        title='Catalogos'
        icon={() => <Icon name='book' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Scene
          key='catalogos'
          title='Catalogos'
          component={CatalogosContainer}
          Layout={CatalogosList}
        />
      </Stack>
      <Stack
        title='Directorio'
        icon={() => <Icon name='book' {...DefaultProps.icons} />}
        {...DefaultProps.navbarProps}
      >
        <Tabs
          key="directory"
          title='Artistas'
          {...DefaultProps.topTabProps}
          headerMode='none'
        >
          <Stack
            title='Artistas'
          >
            <Scene
              key='artistas'
              title='Artistas'
              initial
              component={ArtistasContainer}
              Layout={ArtistasList}
            />
          </Stack>
          <Stack
            title='Miembros'
          >
            <Scene
              key='miembros'
              title='Miembros'
              initial
              component={MiembrosContainer}
              Layout={MiembrosList}
            />
          </Stack>
        </Tabs>
        <Scene
          key='artista'
          title='Artista'
          component={ArtistasContainer}
          Layout={ArtistaProfile}
        />
      </Stack>
    </Tabs>
  </Scene>
);

export default Index;
