import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, TouchableOpacity, RefreshControl, Image, View } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import getRNDraftJSBlocks from 'react-native-draftjs-render';
import { distanceInWordsToNow } from 'date-fns';

import Loading from './Loading';
import Error from './Error';
import Header from './Header';
import Spacer from './Spacer';

const NoticiasList = ({
  error,
  loading,
  noticias,
  reFetch,
}) => {
  // Loading
  if (loading) return <Loading />;

  // Error
  if (error) return <Error content={error} />;

  const keyExtractor = item => item.id;

  const onPress = item => Actions.noticia({ match: { params: { id: String(item.id) } } });

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
        <Header
          title="Noticias"
        />

        <FlatList
          numColumns={1}
          data={noticias}
          renderItem={({ item }) => (
            <View style={styles.bordered}>
              <Card transparent style={{ paddingHorizontal: 6 }}>
                <CardItem cardBody>
                  <Body>
                    <Spacer size={15} />
                    <Text style={{ fontWeight: '800' }}>{item.title} • {distanceInWordsToNow(item.publishDate)}</Text>
                    <Spacer size={15} />
                    <View>{getRNDraftJSBlocks({ contentState: JSON.parse(item.rawContent) })}</View>
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

NoticiasList.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  noticias: PropTypes.array.isRequired,
  reFetch: PropTypes.func,
};

NoticiasList.defaultProps = {
  error: null,
  reFetch: null,
};

export default NoticiasList;
