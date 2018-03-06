import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import CarouselHolder from '../carousel/CarouselHolder';
import LotesListItemObra from './LotesListItemObra';
import LoteHeader from './LoteHeader';
import BuyButton from '../BuyButton';

import styles from '../../constants/styles';

const LotesListItem = ({
  lote,
}) => {

  const keyExtractor = item => item.id;

  const onPressArtista = id => Actions.artista({ match: { params: { id: String(id) } } });
  const onPressLote = id => Actions.lote({ match: { params: { id: String(id) } } });

  return (
    <View style={[styles.bordered, styles.paddingBottomLarge]}>
      <LoteHeader lote={lote} />
      <CarouselHolder obras={lote.obras} />

      <TouchableOpacity
        onPress={() => onPressArtista(lote.artista.id)}
        style={[
          styles.container,
          styles.backgroundWhite,
          styles.paddingTopSmall,
          styles.paddingBottomSmall,
          styles.flexRow,
          { justifyContent: 'space-between' }
        ]}
      >
        <Text style={styles.fontBold}>{lote.artista.name}</Text>
        <Text style={[styles.textLink, styles.fontSizeSmall]}>Ver bio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPressLote(lote.id)}
        style={[
          styles.container,
          styles.backgroundWhite
        ]}
      >
        <View>
          {lote.obras.map( (item, key) => {
            return (
              <LotesListItemObra key={keyExtractor(item)} obra={item}/>
            )
          })}
        </View>
        <View style={[styles.paddingTopSmall,]}>
          <Text style={[styles.fontSizeSmall, styles.textLink]}>Ver más</Text>
        </View>
      </TouchableOpacity>

      <BuyButton lote={lote} />
    </View>
  );
};

LotesListItem.propTypes = {
  lote: PropTypes.object.isRequired,
};

export default LotesListItem;
