import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

import styles from '../../constants/styles';

const EmptyCatalogo = () => (
  <View style={{ flex: 1 }}>
    <ScrollView
      style={styles.backgroundWhite}
    >
      <View style={[
        styles.container,
        styles.flexCenter,
        styles.emptyItemsHeight,
      ]}
      >
        <Text style={[
          styles.textAlignCenter,
        ]}
        >Aún no hay ningun catálogo para mostrar
        </Text>
        <View style={[styles.paddingTopBasic, styles.paddingBottomBasic]}>
          <Image source={require('../../../images/icons/icon-tab-catalogo-black.png')} style={{ width: 36.5, height: 50 }} />
        </View>
        <Text style={[
          styles.textAlignCenter,
          styles.fontSizeSmall,
        ]}
        >Espera pronto el lanzamiento del siguiente catalógo
        </Text>
      </View>
    </ScrollView>
  </View>
);

export default EmptyCatalogo;
