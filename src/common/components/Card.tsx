import React, { PureComponent } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { CardEntity } from '../models/card';

interface Props {
	item: CardEntity;
	navigation: any;
	entitiesType: string;
}

const placeholderPoster = require('../../assets/placeholder.png');

export class Card extends PureComponent<Props> {
	render() {
		const { item, navigation, entitiesType } = this.props;

		function goToDetailScreen() {
			navigation.navigate('Detail', { id: item.id, entitiesType });
		}

		return (
			<TouchableOpacity style={styles.container} onPress={() => goToDetailScreen()}>
				{item?.poster_path ? (
					<Image
						resizeMode={'cover'}
						source={{ uri: 'https://image.tmdb.org/t/p/w500' + item.poster_path }}
						style={styles.image}
					/>
				) : (
					<Image resizeMode={'cover'} source={placeholderPoster} style={styles.image} />
				)}
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		marginRight: 10,
		marginBottom: 10,
	},

	image: {
		width: 116,
		height: 200,
		borderRadius: 10,
	},
});
