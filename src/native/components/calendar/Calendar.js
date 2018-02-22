import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { toggleCalendar } from '../../../actions/calendarActions';

import Loading from '../Loading';
import Error from '../Error';
import Header from '../Header';
import Spacer from '../Spacer';

import CalendarItem from './CalendarItem';

const getDates = (activeCatalogo, futureCatalogos) => {

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

  return dates;

}

const Calendar = ({
  error,
  loading,
  activeCatalogo,
  futureCatalogos,
  toggleCalendar,
  reFetch,
  show,
}) => {

  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const dates = getDates(activeCatalogo, futureCatalogos);

  const keyExtractor = item => item.date;

  const onPress = item => Actions.noticia({ match: { params: { id: String(item.id) } } });

  const baseHeight = 100;
  const height =  show ? dates.length * baseHeight : baseHeight;

  return (
    <View style={{
      height: height,
    }}>
      <TouchableOpacity onPress={toggleCalendar} activeOpacity={0.9}>
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
      </TouchableOpacity>
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

const mapStateToProps = state => ({
  show: state.calendar.show || false,
});

const mapDispatchToProps = {
  toggleCalendar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
