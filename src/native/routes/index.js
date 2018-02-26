import React from 'react';
import { Image } from 'react-native';
import { Scene, Tabs, Stack, Actions } from 'react-native-router-flux';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import NoticiasContainer from '../../containers/NoticiasContainer';
import Noticias from '../components/noticias/Noticias';

import CatalogosContainer from '../../containers/CatalogosContainer';
import CatalogosList from '../components/catalogos/Catalogos';

import LotesContainer from '../../containers/LotesContainer';
import LoteSingle from '../components/lotes/LoteSingle';

import WishlistContainer from '../../containers/WishlistContainer';
import WishlistList from '../components/wishlist/WishlistList';

import ArtistasContainer from '../../containers/ArtistasContainer';
import ArtistasList from '../components/artistas/ArtistasList';
import ArtistaProfile from '../components/artistas/ArtistaProfile';

import MiembrosContainer from '../../containers/MiembrosContainer';
import MiembrosList from '../components/miembros/MiembrosList';
import MiembroProfile from '../components/miembros/MiembroProfile';
import MiembroOptions from '../components/miembros/MiembroOptions';
import MiembroOptionsPage from '../components/miembros/MiembroOptionsPage';

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

import Logo from '../../images/andamiaje-logo-title.png';
import BackButton from '../../images/icons/icon-back.png';

// react-native-router-flux API docs
// https://github.com/aksonov/react-native-router-flux/blob/master/docs/API.md

const Index = (
  <Scene
    key="root"
    backButtonImage={BackButton}
    backButtonImageStyle={{
      height: 16,
      width: 8.5
    }}
  >
    <Scene
      key='login'
      title='LOGIN'
      component={LoginContainer}
      Layout={LoginComponent}
      hideNavBar
      initial
    />
    <Tabs
      key='main'
      lazy={true}
      {...DefaultProps.tabProps}
      hideNavBar
    >
      <Stack
        title='Noticias'
        icon={() => {
          const imageStyle = {height: 25, width: 17.5};
          const imageIcon = Actions.currentScene === 'noticias' ? <Image source={require('../../images/icons/icon-tab-noticias-black.png')} style={imageStyle} /> : <Image source={require('../../images/icons/icon-tab-noticias-white.png')} style={imageStyle} />;

          return (imageIcon);
        }}
        {...DefaultProps.navbarProps}
        initial
      >
        <Scene
          key='noticias'
          title='Noticias'
          navigationBarTitleImage={Logo}
          navigationBarTitleImageStyle={{
            height: 20,
            width: 81.5,
            alignSelf: 'center'
          }}
          component={NoticiasContainer}
          Layout={Noticias}
        />
      </Stack>
      <Stack
        title='Catálogo'
        icon={() => {
          const imageStyle = {height: 25, width: 22};
          const imageIcon = Actions.currentScene === 'catalogos' || Actions.currentScene === 'lote' ? <Image source={require('../../images/icons/icon-tab-catalogo-black.png')} style={imageStyle} /> : <Image source={require('../../images/icons/icon-tab-catalogo-white.png')} style={imageStyle} />;

          return (imageIcon);
        }}
        {...DefaultProps.navbarProps}
      >
        <Scene
          key='catalogos'
          title='Catálogo'
          component={CatalogosContainer}
          Layout={CatalogosList}
        />
        <Scene
          key='lote'
          title='Obra'
          component={LotesContainer}
          Layout={LoteSingle}
          includeObras={true}
        />
      </Stack>
      <Stack
        title='Deseos'
        icon={() => {
          const imageStyle = {height: 25, width: 18.5};
          const imageIcon = Actions.currentScene === 'wishlist' ? <Image source={require('../../images/icons/icon-tab-wishlist-black.png')} style={imageStyle} /> : <Image source={require('../../images/icons/icon-tab-wishlist-white.png')} style={imageStyle} />;

          return (imageIcon);
        }}
        {...DefaultProps.navbarProps}
      >
        <Scene
          key='wishlist'
          title='Deseos'
          component={WishlistContainer}
          Layout={WishlistList}
        />
      </Stack>
      <Stack
        title='Directorio'
        icon={() => {
          const imageStyle = {height: 25, width: 23.5};
          const imageIcon = Actions.currentScene === 'artistas' || Actions.currentScene === 'miembros' || Actions.currentScene === 'artista' || Actions.currentScene === 'miembro' || Actions.currentScene === 'options' || Actions.currentScene === 'optionsPage' ? <Image source={require('../../images/icons/icon-tab-directorio-black.png')} style={imageStyle} /> : <Image source={require('../../images/icons/icon-tab-directorio-white.png')} style={imageStyle} />;

          return (imageIcon);
        }}
        {...DefaultProps.navbarProps}
      >
        <Tabs
          key="directorio"
          title='Directorio'
          {...DefaultProps.topTabProps}
          headerMode='none'
        >
          <Stack
            title='Artistas'
            initial
          >
            <Scene
              key='artistas'
              title='Artistas'
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
        <Scene
          key='miembro'
          title='Miembro'
          component={MiembrosContainer}
          Layout={MiembroProfile}
        />
        <Scene
          key='options'
          title='Opciones'
          component={MiembrosContainer}
          Layout={MiembroOptions}
        />
        <Scene
          key='acercaDeAndamiaje'
          title={'Acerca de Andamiaje'}
          component={MiembroOptionsPage}
        />
        <Scene
          key='terminosYCondiciones'
          title={'Términos y Condiciones'}
          component={MiembroOptionsPage}
        />
        <Scene
          key='politicaDePrivacidad'
          title={'Política de privacidad'}
          component={MiembroOptionsPage}
        />
      </Stack>
    </Tabs>
  </Scene>
);

export default Index;
