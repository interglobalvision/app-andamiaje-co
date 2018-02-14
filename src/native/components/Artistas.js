import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';

import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const ArtistasList = ({
  error,
  loading,
  artistas,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.artista({ match: { params: { id: String(item.id) } } });

  const styles = StyleSheet.create({
    bordered: {
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderBottomColor: 'black',
    }
  });

  return (
    <Container>
      <Content padder>
        <FlatList
          numColumns={1}
          data={artistas}
          renderItem={({ item }) => (
            <View style={styles.bordered}>
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={15} />
                    <Text style={{ fontWeight: '800' }}>{item.name}</Text>
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

ArtistasList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  artistas: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

ArtistasList.defaultProps = {
  error: null,
  reFetch: null,
};

export default ArtistasList;
