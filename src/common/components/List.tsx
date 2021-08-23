import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { CardEntity } from '../models/card';
import { Color } from '../core/themes/theme';
import { Card } from './Card';

interface Props {
	entities: any[];
	title: string;
	navigation: any;
	entitiesType: string;
}

export class List extends PureComponent<Props> {
	render() {
		const { entities, title, navigation, entitiesType } = this.props;

		const getItem = (items: CardEntity[], index: number): CardEntity => ({
			id: items[index].id,
			poster_path: items[index].poster_path,
		});

		return (
			<View style={styles.listContainer}>
				<View style={styles.listHeader}>
					<Text style={styles.listHeaderText}>{title}</Text>
				</View>

				<View style={styles.flatListWrapper}>
					<VirtualizedList
						horizontal
						data={entities}
						getItem={getItem}
						getItemCount={() => entities.length}
						initialNumToRender={5}
						contentContainerStyle={styles.flatList}
						showsHorizontalScrollIndicator={false}
						renderItem={({ item }) => (
							<Card navigation={navigation} item={item} entitiesType={entitiesType} />
						)}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	listContainer: {
		paddingTop: 30,
	},

	listHeader: {
		paddingLeft: 25,
	},

	listHeaderText: {
		color: Color.Retro,
		fontWeight: 'bold',
	},

	flatListWrapper: {
		paddingTop: 10,
	},

	flatList: {
		paddingHorizontal: 25,
	},
});
