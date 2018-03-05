import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, ScrollView, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import LotesContainer from '../../../containers/LotesContainer';
import CountdownTitle from '../countdown/CountdownTitle';
import CountdownClock from '../countdown/CountdownClock';

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
  countdown,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.catalogo({ match: { params: { id: String(item.id) } } });

  const {
    saleSoon,
    saleStarted,
    saleEnded,
  } = countdown;

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
          <CountdownClock countdownTo={activeCatalogo.saleDate} />
        }
        {saleStarted &&
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
  reFetch: PropTypes.func,
};

CatalogosList.defaultProps = {
  error: null,
  reFetch: null,
};

export default CatalogosList;
