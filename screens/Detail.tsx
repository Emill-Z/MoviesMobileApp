import React, { useEffect, useState, Fragment } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, View, Modal } from 'react-native';
import PlayButton from '../components/PlayButton';
import { getById } from '../services/http/movies';
import VideoPlayer from 'react-native-video-controls';
import { EntitiesType } from '../models/movies';
import { Color } from '../themes/theme';

const placeholderPoster = require('../assets/placeholder.png');

const dimensions = Dimensions.get('screen');

const Detail = ({ route, navigation }: any) => {
	const { id, entitiesType } = route.params;

	const [movieDetail, setState] = useState<any>(null);
	const [modalVisible, setModalVisible] = useState<any>(false);

	useEffect(() => {
		getById(id, entitiesType)
			.then(({ data }) => {
				if (data) {
					setState(data);
				}
			})
			.catch(e => {
				console.log(e);
			});
	}, [id, entitiesType]);

	const toggleModal = (): void => {
		setModalVisible(!modalVisible);
	};

	return (
		<Fragment>
			<ScrollView style={styles.container}>
				<View>
					{movieDetail?.poster_path ? (
						<Image
							style={styles.poster}
							source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}` }}
						/>
					) : (
						<Image resizeMode={'cover'} source={placeholderPoster} style={styles.poster} />
					)}

					<View style={styles.playBtnContainer}>
						<View style={styles.playBtn}>
							<PlayButton handlePress={toggleModal} />
						</View>
					</View>

					{entitiesType === EntitiesType.Movie ? (
						<Text style={{ ...styles.title, ...styles.text }}>{movieDetail?.title}</Text>
					) : (
						<Text style={{ ...styles.title, ...styles.text }}>{movieDetail?.name}</Text>
					)}

					<View style={styles.genresContainer}>
						{movieDetail?.genres &&
							movieDetail.genres.map((i: any) => (
								<Text style={[styles.genreItem, styles.text]} key={i.id}>
									{i.name}
								</Text>
							))}
					</View>

					{(movieDetail?.vote_average && (
						<View style={styles.rate}>
							<Text style={styles.text}>Users rate: {movieDetail?.vote_average}</Text>
						</View>
					)) || (
						<View style={styles.rate}>
							<Text style={styles.text}>No rate yet</Text>
						</View>
					)}

					{(movieDetail?.overview && (
						<View style={styles.overview}>
							{movieDetail?.overview && <Text style={styles.text}>{movieDetail?.overview}</Text>}
						</View>
					)) || (
						<View style={styles.overview}>
							<Text style={styles.text}>No overview yet</Text>
						</View>
					)}

					{(entitiesType === EntitiesType.Movie && movieDetail?.release_date && (
						<View style={styles.releaseDate}>
							<Text style={styles.text}>Release date: {movieDetail?.release_date}</Text>
						</View>
					)) || <Text> </Text>}

					{(entitiesType === EntitiesType.Tv && movieDetail?.first_air_date && (
						<View style={styles.releaseDate}>
							<Text style={styles.text}>First air date: {movieDetail?.first_air_date}</Text>
						</View>
					)) || <Text> </Text>}
				</View>
			</ScrollView>

			<Modal
				supportedOrientations={['landscape', 'portrait']}
				animationType={'slide'}
				transparent={true}
				visible={modalVisible}
			>
				<View style={styles.videoModal}>
					<VideoPlayer
						navigator={navigation}
						source={{ uri: 'https://vjs.zencdn.net/v/oceans.mp4' }}
						onBack={toggleModal}
					/>
				</View>
			</Modal>
		</Fragment>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Color.Black,
	},

	text: {
		color: Color.White,
	},

	poster: {
		width: dimensions.width,
		height: dimensions.height / 1.7,
	},

	playBtnContainer: {
		position: 'relative',
	},

	playBtn: {
		position: 'absolute',
		top: -25,
		right: 30,
	},

	title: {
		marginTop: 35,
		marginBottom: 15,
		fontSize: 30,
		fontWeight: 'bold',
		textAlign: 'center',
	},

	genresContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		flexWrap: 'wrap',
	},

	genreItem: {
		marginRight: 15,
		color: Color.White,
	},

	rate: {
		alignItems: 'center',
		paddingTop: 20,
	},

	releaseDate: {
		alignItems: 'center',
		paddingTop: 20,
		marginBottom: 50,
	},

	overview: {
		alignItems: 'center',
		paddingTop: 20,
		paddingHorizontal: 20,
	},

	videoModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default Detail;
