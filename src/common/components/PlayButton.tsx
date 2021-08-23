import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Color } from '../core/themes/theme';

const playIcon = require('../../assets/icon-play-white.png');

interface Props {
	handlePress(): void;
}

class PlayButton extends PureComponent<Props> {
	render() {
		const { handlePress } = this.props;

		return (
			<TouchableOpacity onPress={handlePress} style={styles.btn}>
				<Image resizeMode={'cover'} style={styles.iconPlay} source={playIcon} />
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	btn: {
		width: 50,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: Color.Retro,
		borderRadius: 50,
	},
	iconPlay: {
		width: 20,
		height: 20,
		marginRight: -4,
	},
});

export default PlayButton;
