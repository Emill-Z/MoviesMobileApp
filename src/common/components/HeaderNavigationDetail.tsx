import React, { PureComponent } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
	navigation: any;
}

class HeaderNavigationDetail extends PureComponent<Props> {
	render() {
		const { navigation } = this.props;

		return (
			<SafeAreaView style={styles.container}>
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.text}>Back</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		paddingHorizontal: 25,
		zIndex: 99,
	},
	text: {
		fontSize: 20,
		color: 'white',
		textShadowColor: 'black',
	},
});

export default HeaderNavigationDetail;
