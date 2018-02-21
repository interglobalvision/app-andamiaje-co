import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity, Picker } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

class OrderPicker extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Ordenar' },
      { key: index++, label: 'Artista A-Z', value: 'artist-az' },
      { key: index++, label: 'Artista Z-A', value: 'artist-za' },
      { key: index++, label: 'Precio ↑', value: 'price-asc' },
      { key: index++, label: 'Precio ↓', value: 'price-desc' }
    ];

    return(
      <ModalSelector
        data={data}
        initValue="Ordenar"
        onChange={(option) => {this.props.onValueChange(option.value)}}
      />
    )
  }


}
export default OrderPicker;
