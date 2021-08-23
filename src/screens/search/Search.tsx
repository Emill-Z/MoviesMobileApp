import React, { useState } from 'react';
import { FlatList, Image, Text, TextInput, TouchableOpacity, View, VirtualizedList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Card } from '../../common/components/Card';
import { searchMovieTv } from '../../common/services/http/movies';
import { CardEntity } from '../../common/models/card';
import { EntitiesType } from '../../common/models/movies';
import { Color } from '../../common/core/themes/theme';
import { stylesSheet } from './styles';

const bgr = require('../../assets/search-section-bgr.jpg');
const search = require('../../assets/search-icon-white.png');

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
		<View style={stylesSheet.container}>
			<View style={stylesSheet.searchSection}>
				<Text style={stylesSheet.searchSectionText}>Search</Text>
				<Image style={stylesSheet.searchSectionImg} blurRadius={3} resizeMode={'cover'} source={bgr} />
			</View>

			<View style={stylesSheet.searchContainer}>
				<TextInput
					placeholderTextColor={Color.White}
					style={stylesSheet.input}
					placeholder={'Search movie'}
					onChangeText={onChangeText}
				/>
				<TouchableOpacity style={stylesSheet.searchBtn} onPress={() => onSubmit(searchValue)}>
					<Image style={stylesSheet.searchBtnImg} source={search} />
				</TouchableOpacity>
			</View>
			{(searchResult?.length && (
				<View style={stylesSheet.resultList}>
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
					<Text style={stylesSheet.placeholderText}>Start search to see movies</Text>
				</View>
			)}
		</View>
	);
};

export default Search;
