import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LotesContainer from '../../../containers/LotesContainer';
import CountdownTitle from '../countdown/CountdownTitle';
import Countdown from '../countdown/Countdown';

import styles from '../../constants/styles';

import Toast from '../Toast';
import Loading from '../Loading';
import Error from '../Error';
import Header from '../Header';
import Spacer from '../Spacer';

const CatalogosList = ({
  error,
  loading,
  activeCatalogo,
  pastCatalogos,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.catalogo({ match: { params: { id: String(item.id) } } });

  const currentDate = Date.now();
  const oneDay = 86400000;
  const countdownBeforeSale = oneDay * 5;
  const timeUntilSale = activeCatalogo.saleDate - currentDate;

  const saleSoon = (timeUntilSale < countdownBeforeSale) && (currentDate < activeCatalogo.saleDate) ? true : false;
  const saleStarted = (currentDate > activeCatalogo.saleDate) && (currentDate < activeCatalogo.endDate) ? true : false;
  const saleEnded = currentDate > activeCatalogo.endDate ? true : false;

  return (
    <View style={{flex: 1}}>
      <ScrollView
        stickyHeaderIndices={saleSoon || saleStarted ? [1] : null}
        style={styles.backgroundWhite}
      >
      
        {(saleSoon || saleStarted || saleEnded) &&
          <CountdownTitle title={activeCatalogo.title} saleStarted={saleStarted} saleEnded={saleEnded} />
        }
        {saleSoon &&
          <Countdown countdownTo={activeCatalogo.saleDate} />
        }
        {saleStarted &&
          <Countdown countdownTo={activeCatalogo.endDate} />
        }

        <LotesContainer includeObras={false} />

        <FlatList
          numColumns={1}
          data={pastCatalogos}
          renderItem={({ item }) => (
            <View>
              <Spacer />
              <Text style={styles.fontFamilyMedium}>{item.title}</Text>
              <Spacer />
            </View>
          )}
          keyExtractor={keyExtractor}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={reFetch}
            />
          }
        />
      </ScrollView>
      <Toast />
    </View>
  );
};

CatalogosList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  activeCatalogo: PropTypes.object.isRequired,
  pastCatalogos: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

CatalogosList.defaultProps = {
  error: null,
  reFetch: null,
};

export default CatalogosList;
