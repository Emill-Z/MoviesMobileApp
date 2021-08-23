import React, { PureComponent } from 'react';
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../core/themes/theme';

const dimensions = Dimensions.get('screen');

const logo = require('../../assets/logo.png');

interface Props {
	navigation: any;
}

class HeaderNavigationHome extends PureComponent<Props> {
	render() {
		const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.container}>
				<View style={styles.logoContainer}>
					<Image style={styles.logo} source={logo} />
				</View>

				<Pressable onPress={() => navigation.navigate('Search')}>
					<Text style={styles.searchText}>Search</Text>
				</Pressable>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		width: dimensions.width,
		paddingHorizontal: 25,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		zIndex: 99,
	},
	logoContainer: {
		width: 40,
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 50,
		backgroundColor: Color.Retro,
	},
	logo: {
		width: 23,
		height: 23,
	},
	searchText: {
		fontWeight: 'bold',
		fontSize: 20,
		color: Color.Retro,
	},
});

export default HeaderNavigationHome;
