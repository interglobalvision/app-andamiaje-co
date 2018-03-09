import React from 'react';
import { View } from 'react-native';
import SectionHeader from '../SectionHeader';
import WishlistItem from '../wishlist/WishlistItem';

const ArtistaLotes = ({ lotes, artistaId }) => {
  const artistaLotes = lotes.filter(lote => lote.artista.id === artistaId);

  return (
    <View>
      <SectionHeader title={'Obras'} />
      <View>
        { artistaLotes.map( (item, key) => <WishlistItem key={key} lote={item} />)}
      </View>
    </View>
  );
}

export default ArtistaLotes;
