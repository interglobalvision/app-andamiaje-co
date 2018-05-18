import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles, { containerWidth } from '../../constants/styles';
import SectionHeader from '../SectionHeader';
import Thumbnail from 'react-native-thumbnail-video';

const ArtistaVideo = ({
  video,
}) => {
  const hasVideo = video.url !== undefined && video.url !== '' && video.provider === 'youtube';

  if (hasVideo) {
    return (
      <View>
        <SectionHeader title="Video" />
        <View style={[
          styles.container,
          styles.paddingTopSmall,
          styles.paddingBottomLarge,
        ]}
        >
          <Thumbnail
            url={video.url}
            imageWidth={containerWidth}
            imageHeight={((containerWidth / 16) * 9)}
            iconStyle={{ width: 25, height: 29 }}
          />
        </View>
      </View>
    );
  }
  return null;
};

ArtistaVideo.propTypes = {
  video: PropTypes.object.isRequired,
};

export default ArtistaVideo;
