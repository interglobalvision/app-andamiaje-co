import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity, Picker } from 'react-native';

class OrderPicker extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    return(
      <Picker
        onValueChange={this.props.onValueChange}
        >
        <Picker.Item
          label='Ordernar'
          value='default'
        />
        <Picker.Item
          label='Artista A-Z'
          value='artist-az'
        />
        <Picker.Item
          label='Artista Z-A'
          value='artist-za'
        />
        <Picker.Item
          label='Precio ↑'
          value='price-asc'
        />
        <Picker.Item
          label='Precio ↓'
          value='price-desc'
        />
      </Picker>
    )
  }


}
export default OrderPicker;
