import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Loading from '../Loading';
import Error from '../Error';
import Header from '../Header';
import Spacer from '../Spacer';

import CalendarItem from './CalendarItem';

const Calendar = ({
  error,
  loading,
  activeCatalogo,
  futureCatalogos,
  reFetch,
}) => {

  const catalogos = [activeCatalogo, ...futureCatalogos]

  // Generate a single array for each date (only startDate and saleDate) in all Catalogos
  let dates = [].concat.apply([], catalogos.map( catalogo => {
    return [{
      date: catalogo.startDate,
      label: `El Catálogo ${catalogo.title} sale el`
    }, {
      date: catalogo.saleDate,
      label: `La Subasta ${catalogo.title} comienza el`
    }];
  }));

  // Filter past dates
  const now = new Date().getTime();
  dates = dates.filter( event => {
    return event.date > now;
  });

  // Sort by dates
  dates = dates.sort( (a,b) => {
    if(a.date > b.date) {
      return 1;
    } else if (a.date < b.date) {
      return -1;
    } else {
      return 0;
    }
  });

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.date;

  const onPress = item => Actions.noticia({ match: { params: { id: String(item.id) } } });

  return (
    <View>
      <FlatList
        numColumns={1}
        data={dates}
        renderItem={({ item }) => (
         <CalendarItem item={item} />
        )}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={reFetch}
          />
        }
      />
    </View>
  );
};

Calendar.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  activeCatalogo: PropTypes.object.isRequired,
  pastCatalogos: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

Calendar.defaultProps = {
  error: null,
  reFetch: null,
};

export default Calendar;
