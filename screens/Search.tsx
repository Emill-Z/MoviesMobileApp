import React, { useState } from 'react';
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	VirtualizedList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../components/Card';
import { CardEntity } from '../models/card';
import { EntitiesType } from '../models/movies';
import { searchMovieTv } from '../services/http/movies';
import { Color } from '../themes/theme';

const dimensions = Dimensions.get('screen');

const bgr = require('../assets/search-section-bgr.jpg');
const search = require('../assets/search-icon-white.png');

const Search = ({ navigation }) => {
	const f = useSafeAreaInsets();

	console.log(f);

	const [searchResult, setSearchResult] = useState([]);
	const [searchValue, setSearchValue] = useState<string>('');

	const onSubmit = (query: string) => {
		searchMovieTv(EntitiesType.Movie, query)
			.then(({ data }) => {
				setSearchResult(data.results);
			})
			.catch(() => {});
	};

	const onChangeText = (value: string) => {
		if (!value.trim()) {
			return;
		}
		setSearchValue(value);
	};

	const getItem = (items: CardEntity[], index: number): CardEntity[] => {
		const arr = [...items].splice(index * 3, 3);

		return arr.map(e => ({
			id: e.id,
			poster_path: e.poster_path,
		}));
	};

	return (
		<View style={styles.container}>
			<View style={styles.searchSection}>
				<Text style={styles.searchSectionText}>Search</Text>
				<Image style={styles.searchSectionImg} blurRadius={3} resizeMode={'cover'} source={bgr} />
			</View>

			<View style={styles.searchContainer}>
				<TextInput
					placeholderTextColor={Color.White}
					style={styles.input}
					placeholder={'Search movie'}
					onChangeText={onChangeText}
				/>
				<TouchableOpacity style={styles.searchBtn} onPress={() => onSubmit(searchValue)}>
					<Image style={styles.searchBtnImg} source={search} />
				</TouchableOpacity>
			</View>
			{(searchResult?.length && (
				<View style={styles.resultList}>
					<VirtualizedList
						data={searchResult}
						getItem={getItem}
						getItemCount={() => searchResult.length}
						initialNumToRender={15}
						showsHorizontalScrollIndicator={false}
						keyExtractor={(_, index) => index.toString()}
						renderItem={data => (
							<FlatList
								numColumns={3}
								horizontal={false}
								data={data.item}
								keyExtractor={({ id }) => id.toString()}
								renderItem={({ item }) => (
									<Card navigation={navigation} item={item} entitiesType={EntitiesType.Movie} />
								)}
							/>
						)}
					/>
				</View>
			)) || (
				<View>
					<Text style={styles.placeholderText}>Start search to see movies</Text>
				</View>
			)}
		</View>
	);
};

const headHeight = 200;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Color.Black,
		minHeight: dimensions.height,
		marginBottom: 100,
	},

	placeholderText: {
		fontSize: 15,
		paddingLeft: 15,
		color: Color.Retro,
	},

	searchSection: {
		position: 'relative',
		width: dimensions.width,
		height: headHeight,
		alignItems: 'center',
		justifyContent: 'center',
	},

	searchSectionText: {
		position: 'absolute',
		margin: 'auto',
		color: Color.Retro,
		fontWeight: 'bold',
		fontSize: 20,
		opacity: 0.8,
		zIndex: 9,
	},

	searchSectionImg: {
		width: dimensions.width,
		height: headHeight,
	},

	searchContainer: {
		position: 'relative',
	},

	searchBtn: {
		position: 'absolute',
		right: 30,
		top: -10,
	},

	input: {
		marginTop: -20,
		height: 40,
		margin: 12,
		padding: 10,
		borderRadius: 3,
		backgroundColor: Color.GreyDark,
		color: Color.White,
	},

	searchBtnImg: {
		width: 20,
		height: 20,
	},

	resultList: {
		height: dimensions.height - headHeight,
		paddingHorizontal: 10,
	},
});

export default Search;
