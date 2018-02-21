import React, {Component} from 'react';
import { TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

class FilterPicker extends Component {
  constructor(props) {
    super(props)

    let index = 0;
    this.data = [
      { key: index++, section: true, label: 'Filtrar' },
      { key: index++, label: 'Todas', value: '', display: 'Filtrar' },
      { key: index++, label: 'Escultura', value: 'escultura', display: 'Escultura' },
      { key: index++, label: 'Pintura', value: 'pintura', display: 'Pintura' },
      { key: index++, label: 'Foto', value: 'foto', display: 'Foto' },
      { key: index++, label: 'Video', value: 'video', display: 'Video' },
      { key: index++, label: 'Instalación', value: 'instalacion', display: 'Instalación' },
      { key: index++, label: 'Dibujo', value: 'dibujo', display: 'Dibujo' },
    ];

    const initLabel = this.data.find(item => item.value === props.initValue).display;

    this.state = {
      textInputValue: initLabel
    }
  }

  render() {



    return(
      <ModalSelector
        data={this.data}
        initValue={this.props.initValue}
        onChange={(option) => {
          this.props.onValueChange(option.value);
          this.setState({textInputValue:option.display});
        }}
        cancelText='Cancelar'
      >
        <TextInput
          style={{borderWidth:0, textAlign: 'center'}}
          editable={false}
          placeholder='Filtrar'
          value={this.state.textInputValue}
        />
      </ModalSelector>
    )
  }

}
export default FilterPicker;
