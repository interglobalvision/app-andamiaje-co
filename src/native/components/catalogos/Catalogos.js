import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LotesContainer from '../../../containers/LotesContainer';
import CountdownTitle from '../countdown/CountdownTitle';
import CountdownClock from '../countdown/CountdownClock';
import EmptyCatalogo from './EmptyCatalogo';

import styles from '../../constants/styles';

import Toast from '../Toast';
import Loading from '../Loading';
import Error from '../Error';
import Spacer from '../Spacer';

const CatalogosList = ({
  error,
  loading,
  activeCatalogo,
  pastCatalogos,
  countdown,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.catalogo({ match: { params: { id: String(item.id) } } });

  // ** HARD CODED UGLY FIX ** Empty Catalog
  return <EmptyCatalogo />;

  const {
    saleSoon,
    saleStarted,
    saleEnded,
    catalogosCountdown,
  } = countdown;

  return (
    <View style={{flex: 1}}>
      <ScrollView
        stickyHeaderIndices={saleSoon || saleStarted ? [1] : null}
        style={styles.backgroundWhite}
      >

        { catalogosCountdown && (saleSoon || saleStarted || saleEnded) &&
          <CountdownTitle title={activeCatalogo.title} saleStarted={saleStarted} saleEnded={saleEnded} />
        }
        { catalogosCountdown && saleSoon &&
          <CountdownClock countdownTo={activeCatalogo.saleDate} />
        }
        { catalogosCountdown && saleStarted &&
          <CountdownClock countdownTo={activeCatalogo.endDate} />
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
  countdown: PropTypes.object.isRequired,
  reFetch: PropTypes.func,
};

CatalogosList.defaultProps = {
  error: null,
  reFetch: null,
};

export default CatalogosList;
