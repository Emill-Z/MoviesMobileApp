import React, { useEffect, useState, Fragment } from 'react';
import { Image, ScrollView, Text, View, Modal } from 'react-native';
import PlayButton from '../../common/components/PlayButton';
import { getById } from '../../common/services/http/movies';
import VideoPlayer from 'react-native-video-controls';
import { EntitiesType } from '../../common/models/movies';
import { stylesSheet, stylesObj } from './styles';

const placeholderPoster = require('../../assets/placeholder.png');

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
			<ScrollView style={stylesSheet.container}>
				<View>
					{movieDetail?.poster_path ? (
						<Image
							style={stylesSheet.poster}
							source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}` }}
						/>
					) : (
						<Image resizeMode={'cover'} source={placeholderPoster} style={stylesSheet.poster} />
					)}

					<View style={stylesSheet.playBtnContainer}>
						<View style={stylesSheet.playBtn}>
							<PlayButton handlePress={toggleModal} />
						</View>
					</View>

					{entitiesType === EntitiesType.Movie ? (
						<Text style={{ ...stylesObj.title, ...stylesObj.text }}>{movieDetail?.title}</Text>
					) : (
						<Text style={{ ...stylesObj.title, ...stylesObj.text }}>{movieDetail?.name}</Text>
					)}

					<View style={stylesSheet.genresContainer}>
						{movieDetail?.genres &&
							movieDetail.genres.map((i: any) => (
								<Text style={[stylesSheet.genreItem, stylesSheet.text]} key={i.id}>
									{i.name}
								</Text>
							))}
					</View>

					{movieDetail?.vote_average ? (
						<View style={stylesSheet.rate}>
							<Text style={stylesSheet.text}>Users rate: {movieDetail?.vote_average}</Text>
						</View>
					) : (
						<View style={stylesSheet.rate}>
							<Text style={stylesSheet.text}>No rate yet</Text>
						</View>
					)}

					{movieDetail?.overview ? (
						<View style={stylesSheet.overview}>
							{movieDetail?.overview && <Text style={stylesSheet.text}>{movieDetail?.overview}</Text>}
						</View>
					) : (
						<View style={stylesSheet.overview}>
							<Text style={stylesSheet.text}>No overview yet</Text>
						</View>
					)}

					{entitiesType === EntitiesType.Movie && movieDetail?.release_date ? (
						<View style={stylesSheet.releaseDate}>
							<Text style={stylesSheet.text}>Release date: {movieDetail?.release_date}</Text>
						</View>
					) : undefined}

					{entitiesType === EntitiesType.Tv && movieDetail?.first_air_date ? (
						<View style={stylesSheet.releaseDate}>
							<Text style={stylesSheet.text}>First air date: {movieDetail?.first_air_date}</Text>
						</View>
					) : undefined}
				</View>
			</ScrollView>

			<Modal
				supportedOrientations={['landscape', 'portrait']}
				animationType={'slide'}
				transparent={true}
				visible={modalVisible}
			>
				<View style={stylesSheet.videoModal}>
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

export default Detail;
