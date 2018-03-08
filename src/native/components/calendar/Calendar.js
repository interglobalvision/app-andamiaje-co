import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { format } from 'date-fns';
import es from 'date-fns/locale/es';
import * as Animatable from 'react-native-animatable';

import { toggleCalendar } from '../../../actions/calendarActions';

import Loading from '../Loading';
import Error from '../Error';

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
      label: `La Adquisición ${catalogo.title} es el`,
      label2: `Y comienza a las ${format(catalogo.saleDate, 'HH:mm')}`,
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

class Calendar extends Component {
  static propTypes = {
    error: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    activeCatalogo: PropTypes.object.isRequired,
    pastCatalogos: PropTypes.array.isRequired,
    reFetch: PropTypes.func,
  };

  static defaultProps = {
    error: null,
    reFetch: null,
  };

  constructor(props) {
    super(props);

    this.dates = getDates(props.activeCatalogo, props.futureCatalogos);
    this.baseHeight = 100;
  }

  componentDidMount() {
    if (this.props.show) {
      this.props.toggleCalendar();
    }
  }

  animateCalendar = () => {
    this.props.toggleCalendar();

    const fromHeight = this.props.show ? (this.dates.length * this.baseHeight) : this.baseHeight;
    const toHeight = this.props.show ? this.baseHeight : (this.dates.length * this.baseHeight);

    this.view.transition(
      {
        height: fromHeight,
      },
      {
        height: toHeight,
      },
      this.dates.length * 200,
      'ease-in-out'
    );
  }

  handleViewRef = ref => this.view = ref;

  render() {
    const {
      error,
      loading,
      activeCatalogo,
      futureCatalogos,
      reFetch,
    } = this.props;

    // Loading
    if (loading) return <Loading />;

    // Error
    if (error) return <Error content={error} />;

    const keyExtractor = item => item.date;

    if(this.dates.length) {
      return (
        <Animatable.View
          ref={this.handleViewRef}
          style={{
          height: this.baseHeight,
        }}>
          <TouchableOpacity onPress={this.animateCalendar} activeOpacity={0.9}>
            <FlatList
              numColumns={1}
              data={this.dates}
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
        </Animatable.View>
      );
    }

    return null;
  };
};

const mapStateToProps = state => ({
  show: state.calendar.show || false,
});

const mapDispatchToProps = {
  toggleCalendar,
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
