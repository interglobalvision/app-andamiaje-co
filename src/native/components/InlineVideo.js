import React from 'react';
import { View } from 'react-native';
import { Video, ScreenOrientation } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import styles, {} from '../constants/styles';

const InlineVideo = ({ }) => {
  const videoUri = 'https://gcs-vimeo.akamaized.net/exp=1520400579~acl=%2A%2F944083569.mp4%2A~hmac=351fdffeab8e6839008fbfbae18baf97af19f975b3e70ab2c03b6e2d919b8d91/vimeo-prod-skyfire-std-us/01/1520/10/257600524/944083569.mp4';

  return (
    <View style={[
      styles.backgroundWhite,
    ]}>
      <VideoPlayer
        videoProps={{
          shouldPlay: false,
          resizeMode: Video.RESIZE_MODE_CONTAIN,
          source: {
            uri: videoUri,
          },
        }}
        isPortrait={true}
        playFromPositionMillis={0}
        showFullscreenButton={false}
      />
    </View>
  )
};

export default InlineVideo;
