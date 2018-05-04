import React, { Component } from 'react';
import { TextInput } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import styles from '../../constants/styles';
import colors from '../../constants/colors';

class OrderPicker extends Component {
  constructor(props) {
    super(props);

    let index = 0;
    this.data = [
      { key: index++, section: true, label: 'Ordenar' },
      {
        key: index++, label: 'Artista A-Z', value: 'artist-az', display: 'Artista A-Z',
      },
      {
        key: index++, label: 'Artista Z-A', value: 'artist-za', display: 'Artista Z-A',
      },
      {
        key: index++, label: 'Precio ↑', value: 'price-asc', display: 'Precio ↑',
      },
      {
        key: index++, label: 'Precio ↓', value: 'price-desc', display: 'Precio ↓',
      },
      {
        key: index++, label: 'Ninguno', value: '', display: 'Ordenar',
      },
    ];

    // find display string in data array by initial value from state
    const initDisplay = this.data.find(item => item.value === props.initValue) === undefined ? 'Ordenar' : this.data.find(item => item.value === props.initValue).display;

    this.state = {
      textInputValue: initDisplay,
    };
  }

  render() {
    return (
      <ModalSelector
        data={this.data}
        initValue={this.props.initValue}
        onChange={(option) => {
          this.props.onValueChange(option.value);
          this.setState({ textInputValue: option.display });
        }}
        cancelText="Cancelar"
        overlayStyle={[
          styles.backgroundWhite,
          {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          },
        ]}
        optionContainerStyle={[
          styles.backgroundWhite,
          styles.paddingBottomLarge,
          {
            borderWidth: 0,
            width: 300,
            alignSelf: 'center',
          },
        ]}
        sectionTextStyle={[
          styles.fontFamilyMedium,
        ]}
        sectionStyle={[
          {
            borderBottomWidth: 0,
          },
        ]}
        optionStyle={[
          styles.backgroundWhite,
          styles.paddingTopSmall,
          styles.paddingBottomSmall,
        {
          borderBottomColor: colors.lightGrey,
          borderBottomWidth: 1,
        }]}
        optionTextStyle={[
          styles.colorBlack,
        ]}
        cancelStyle={[
          styles.backgroundWhite,
          styles.paddingTopSmall,
          styles.paddingBottomSmall,
          {
            borderColor: colors.lightGrey,
            borderWidth: 1,
            width: 100,
            alignSelf: 'center',
          },
        ]}
      >
        <TextInput
          underlineColorAndroid="rgba(0,0,0,0)"
          autoCorrect={false}
          style={[
            styles.textAlignCenter,
            styles.fontSizeSmall,
            styles.fontBold,
            {
              borderWidth: 0,
            },
          ]}
          editable={false}
          placeholder="Ordenar"
          value={this.state.textInputValue}
        />
      </ModalSelector>
    );
  }
}
export default OrderPicker;
