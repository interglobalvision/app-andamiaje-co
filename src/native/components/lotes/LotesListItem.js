import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, TouchableOpacity, RefreshControl, Image, View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import CarouselHolder from '../carousel/CarouselHolder';
import LotesListItemObra from './LotesListItemObra';
import LoteHeader from './LoteHeader';
import BuyButton from '../BuyButton';

import styles from '../../constants/styles';

const LotesListItem = ({
  lote,
  displayOnly,
  miembroId,
}) => {
  const keyExtractor = item => item.id;

  const onPressArtista = id => Actions.artista({
    match: {
      params: {
        id: String(id),
      },
    },
    onBack: () => {
      Actions.catalogos();
    },
  });

  const onPressLote = (id, backToCollection) => {

    let actionOptions = {
      match: {
        params: {
          id: String(id)
        }
      }
    };

    if(backToCollection !== undefined) {
      actionOptions.onBack = () => {
        Actions.miembro({
          match: {
            params: {
              id: String(backToCollection),
            },
          },
        });
      }
    }

    Actions.lote(actionOptions);
  }

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
          { justifyContent: 'space-between' },
        ]}
      >
        <Text style={styles.fontBold}>{lote.artista.name}</Text>
        <Text style={[styles.textLink, styles.fontSizeSmall]}>Ver bio</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onPressLote(lote.id, miembroId)}
        style={[
          styles.container,
          styles.backgroundWhite,
        ]}
      >
        <View>
          {lote.obras.map((item, key) => (
            <LotesListItemObra key={keyExtractor(item)} obra={item} />
            ))}
        </View>
        <View style={[styles.paddingTopSmall]}>
          <Text style={[styles.fontSizeSmall, styles.textLink]}>Ver más</Text>
        </View>
      </TouchableOpacity>

      { !displayOnly ? <BuyButton lote={lote} /> : null }
    </View>
  );
};

LotesListItem.propTypes = {
  lote: PropTypes.object.isRequired,
};

export default LotesListItem;
