import React, {Component} from 'react';
import { TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

class OrderPicker extends Component {
  constructor(props) {
    super(props)

    let index = 0;
    this.data = [
      { key: index++, section: true, label: 'Ordenar' },
      { key: index++, label: 'Artista A-Z', value: 'artist-az', display: 'Artista A-Z' },
      { key: index++, label: 'Artista Z-A', value: 'artist-za', display: 'Artista Z-A' },
      { key: index++, label: 'Precio ↑', value: 'price-asc', display: 'Precio ↑' },
      { key: index++, label: 'Precio ↓', value: 'price-desc', display: 'Precio ↓' },
      { key: index++, label: 'Ninguno', value: '', display: 'Ordenar' },
    ];

    // find display string in data array by initial value from state
    const initDisplay = this.data.find(item => item.value === props.initValue) === undefined ? 'Ordenar' : this.data.find(item => item.value === props.initValue).display;

    this.state = {
      textInputValue: initDisplay
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
          underlineColorAndroid='rgba(0,0,0,0)'
          autoCorrect={false}
          style={[
            styles.textAlignCenter,
            styles.fontSizeSmall,
            styles.fontBold,
            {
              borderWidth:0
            }
          ]}
          editable={false}
          placeholder='Ordenar'
          value={this.state.textInputValue}
        />
      </ModalSelector>
    )
  }

}
export default OrderPicker;
