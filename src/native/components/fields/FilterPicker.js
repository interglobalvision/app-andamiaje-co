import React, {Component} from 'react';
import { Image, View, Text, TouchableOpacity, Picker } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

class FilterPicker extends Component {
  constructor(props) {
    super(props)

  }

  render() {
    let index = 0;
    const data = [
      { key: index++, section: true, label: 'Filtrar' },
      { key: index++, label: 'Escultura', value: 'escultura' },
      { key: index++, label: 'Pintura', value: 'pintura' },
      { key: index++, label: 'Foto', value: 'foto' },
      { key: index++, label: 'Video', value: 'video' },
      { key: index++, label: 'Instalación', value: 'instalacion' },
      { key: index++, label: 'Dibujo', value: 'dibujo' },
      { key: index++, label: 'Todas', value: 'all' },
    ];

    return(
      <ModalSelector
        data={data}
        initValue="Filtrar"
        onChange={(option) => {this.props.onValueChange(option.value)}}
      />
    )
  }


}
export default FilterPicker;
