import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import styles from '../../constants/styles';

class CountdownTitle extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    saleStarted: PropTypes.bool.isRequired,
    saleEnded: PropTypes.bool.isRequired,
  }

  constructor(props) {
    super(props);
  }

  render() {
    const { title, saleStarted, saleEnded } = this.props;

    const viewStyle = [
      styles.backgroundBlack,
      styles.paddingTopBasic,
      styles.flexCenter,
    ];

    let actionString = 'empieza en';

    if (saleStarted) {
      actionString = 'termina en';
    }

    if (saleEnded) {
      actionString = 'ha terminado';
      viewStyle.push(styles.paddingBottomBasic);
    }

    return (
      <View style={viewStyle}>
        <Text style={[
          styles.colorWhite,
          styles.textAlignCenter,
          styles.fontSizeSmall,
          styles.fontFamilyMedium,
        ]}
        >La Adquisición {title} {actionString}
        </Text>
      </View>
    );
  }
}

export default CountdownTitle;
