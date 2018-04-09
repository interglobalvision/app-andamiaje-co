import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Dimensions } from 'react-native';
import { List } from 'native-base';
import { Actions } from 'react-native-router-flux';
import styles, { containerWidth } from '../../constants/styles';
import SectionHeader from '../SectionHeader';
import Thumbnail from 'react-native-thumbnail-video';
import VimeoPlayer from '../VimeoPlayer';

const ArtistaVideo = ({
  video,
  vimeo,
}) => {
  const windowWidth = Dimensions.get('window').width;

  const hasVideo = video.url !== undefined && video.url !== '' && video.provider === 'youtube';
  const hasVimeo = vimeo !== undefined && vimeo.sources !== undefined;

  if (hasVideo || hasVimeo) {
    return (
      <View>
        <SectionHeader title={'Video'} />
        <View style={[
          styles.paddingTopBasic,
          styles.paddingBottomLarge,
          styles.flexCenter,
        ]}>
          { hasVimeo && <VimeoPlayer sources={vimeo.sources} width={windowWidth} /> }
          { hasVideo && !hasVimeo ? <Thumbnail url={video.url} imageWidth={containerWidth} imageHeight={((containerWidth / 16) * 9)} iconStyle={{width: 25, height: 29}} /> : null }
        </View>
      </View>
    );
  }
  return null;
};

ArtistaVideo.propTypes = {
  video: PropTypes.object.isRequired,
  vimeo: PropTypes.object.isRequired,
};

export default ArtistaVideo;
