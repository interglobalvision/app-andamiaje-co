import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import LotesContainer from '../../containers/LotesContainer';

import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const CatalogosList = ({
  error,
  loading,
  activeCatalogo,
  pastCatalogos,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.catalogo({ match: { params: { id: String(item.id) } } });

  const styles = StyleSheet.create({
    bordered: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: 'black',
    }
  });

  /**
    * pass activeCatalogo Lotes into LotesContainer
    * list pastCatalogos below
    */

  return (
    <Container>
      <Content padder>
        <Header
          title="Catalogos"
        />

        <LotesContainer activeLotes={activeCatalogo.lotes} />

        <FlatList
          numColumns={1}
          data={pastCatalogos}
          renderItem={({ item }) => (
            <View style={styles.bordered}>
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={15} />
                    <Text style={{ fontWeight: '800' }}>{item.title}</Text>
                    <Spacer size={15} />
                  </Body>
                </CardItem>
              </Card>
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

        <Spacer size={20} />
      </Content>
    </Container>
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
