import React, { Component } from 'react';
import { ScrollView, View, TouchableHighlight, Text } from 'react-native';
import VideoPlayer from '@expo/videoplayer';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo';
import { getBestVideoSrc } from '../../lib/utilities';

export default class VimeoPlayer extends Component {
	render() {
    const { sources, width } = this.props;

    const source = getBestVideoSrc(width, sources);

		return (
			<View>
        <VideoPlayer
          debug={true}
          showControlsOnLoad={true}
          showFullscreenButton={false}
          thumbImage={ source.thumb !== undefined && source.thumb.link !== undefined ? source.thumb.link : null }
          isPortrait={true}
          playFromPositionMillis={0}
          videoProps={{
            shouldPlay: false,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: source.link,
            },
          }}
        />
			</View>
		);
	}
}
