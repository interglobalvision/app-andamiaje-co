import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';

import CarouselHolder from '../carousel/CarouselHolder';
import LotesListItemObra from './LotesListItemObra';
import LoteHeader from './LoteHeader';

import styles from '../../constants/styles';

const LotesListItem = ({
  lote,
}) => {

  const keyExtractor = item => item.id;

  const onPress = id => Actions.lote({ match: { params: { id: String(id) } } });

  return (
    <View style={[styles.bordered]}>
      <LoteHeader lote={lote} />
      <CarouselHolder obras={lote.obras} />
      <TouchableOpacity style={[styles.container, styles.backgroundWhite]} onPress={() => onPress(lote.id)}>
        <View style={[styles.paddingTopSmall, styles.paddingBottomSmall]}>
          <Text style={styles.fontBold}>{lote.artista.name}</Text>
        </View>
        <View>
          {lote.obras.map( (item, key) => {
            return (
              <LotesListItemObra key={keyExtractor(item)} obra={item}/>
            )
          })}
        </View>
        <View style={[styles.paddingTopSmall, styles.paddingBottomLarge]}>
          <Text style={[styles.fontSizeSmall]}>Ver más</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

LotesListItem.propTypes = {
  lote: PropTypes.object.isRequired,
};

export default LotesListItem;
