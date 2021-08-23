import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, View, Text, ScrollView } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';
import { List } from '../components/List';
import { EntitiesType, Movie } from '../models/movies';
import { getFamilyMovies, getPopular, getUpcoming } from '../services/http/movies';
import { Color } from '../themes/theme';

const Home = ({ navigation }) => {
	const dimensions = Dimensions.get('screen');
	const [sliderImages, setSliderImages] = useState<any[]>([]);
	const [popularMovies, setPopularMovies] = useState<any[]>([]);
	const [popularTV, setPopularTv] = useState<any[]>([]);
	const [familyMovies, setFamilyMovies] = useState<any[]>([]);

	const getData = () => {
		return Promise.all([
			getUpcoming(),
			getPopular(EntitiesType.Movie),
			getPopular(EntitiesType.Tv),
			getFamilyMovies(),
		]);
	};

	useEffect(() => {
		getData().then(([upcoming, popular, popularTv, family]) => {
			setSliderImages(upcoming.data.results);
			setPopularMovies(popular.data.results);
			setPopularTv(popularTv.data.results);
			setFamilyMovies(family.data.results);
		});
	}, []);

	function onCurrentImagePressed(index: number): void {
		navigation.navigate('Detail', { id: sliderImages[index].id, entitiesType: EntitiesType.Movie });
	}

	return (
		<ScrollView style={styles.container}>
			<View>
				<SliderBox
					autoplay
					circleLoop
					sliderBoxHeight={dimensions.height / 1.7}
					images={sliderImages.map((i: Movie) => `https://image.tmdb.org/t/p/w500${i.poster_path}`)}
					dotStyle={styles.dotSlider}
					onCurrentImagePressed={(index: number) => onCurrentImagePressed(index)}
				/>
			</View>

			<View>
				<List
					entitiesType={EntitiesType.Movie}
					navigation={navigation}
					title={'Popular Movies'}
					entities={popularMovies}
				/>
			</View>

			<View>
				<List
					entitiesType={EntitiesType.Tv}
					navigation={navigation}
					title={'Popular TV Shows'}
					entities={popularTV}
				/>
			</View>

			<View>
				<List
					entitiesType={EntitiesType.Movie}
					navigation={navigation}
					title={'Family Movies'}
					entities={familyMovies}
				/>
			</View>

			<View style={styles.bottomSpace} />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Color.Black,
	},
	dotSlider: {
		width: 0,
		height: 0,
	},

	bottomSpace: {
		paddingBottom: 70,
	},
});

export default Home;
