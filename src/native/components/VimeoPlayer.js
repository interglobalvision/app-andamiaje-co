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

    console.log(source);

		return (
			<View style={styles.container}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: source.link,
            },
          }}
          isPortrait={true}
          playFromPositionMillis={0}
        />
			</View>
		);
	}
}
