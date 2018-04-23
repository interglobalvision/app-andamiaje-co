import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, FlatList, RefreshControl, View, Text, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import _find from 'lodash/find';

import Toast from '../Toast';
import Loading from '../Loading';
import Error from '../Error';

import WishlistItem from './WishlistItem';
import CountdownTitle from '../countdown/CountdownTitle';
import CountdownClock from '../countdown/CountdownClock';

import styles from '../../constants/styles';

const WishlistList = ({
  loading,
  error,
  lotes,
  wishlist,
  activeCatalogo,
  countdown,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const currentWishlist = lotes.filter(lote => _find(wishlist, item => item.id === lote.id));

  const {
    saleSoon,
    saleStarted,
    saleEnded,
    wishlistCountdown,
  } = countdown;

  if (currentWishlist.length) {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          stickyHeaderIndices={saleSoon || saleStarted ? [1] : null}
          style={styles.backgroundWhite}
        >
          { wishlistCountdown && (saleSoon || saleStarted || saleEnded) &&
            <CountdownTitle title={activeCatalogo.title} saleStarted={saleStarted} saleEnded={saleEnded} />
          }
          { wishlistCountdown && saleSoon &&
            <CountdownClock countdownTo={activeCatalogo.saleDate} />
          }
          { wishlistCountdown && saleStarted &&
            <CountdownClock countdownTo={activeCatalogo.endDate} />
          }

          <FlatList
            numColumns={1}
            data={currentWishlist}
            renderItem={({item}) => (<WishlistItem lote={item} />)}
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
  } else {
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
          <View style={[
            styles.container,
            styles.flexCenter,
            styles.emptyItemsHeight
          ]}>
            <Text style={[
              styles.textAlignCenter
            ]}>Parece que tu lista de Deseos está vacía</Text>
            <View style={[styles.paddingTopBasic, styles.paddingBottomBasic]}>
              <Image source={require('../../../images/icons/icon-wishlist-empty.png')} style={{width: 36.5, height: 50}} />
            </View>
            <Text style={[
              styles.textAlignCenter,
              styles.fontSizeSmall,
            ]}>Agrega Obras para guardar las que más te gustan</Text>
          </View>
        </ScrollView>
      </View>
    )
  }
};

WishlistList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  lotes: PropTypes.array.isRequired,
  wishlist: PropTypes.object,
  activeCatalogo: PropTypes.object.isRequired,
  countdown: PropTypes.object.isRequired,
  reFetch: PropTypes.func,
};

WishlistList.defaultProps = {
  error: null,
  reFetch: null,
  wishlist: {},
};

export default WishlistList;
