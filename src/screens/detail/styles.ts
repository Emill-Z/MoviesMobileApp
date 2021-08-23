import { Dimensions, StyleSheet } from 'react-native';
import { Color } from '../../common/core/themes/theme';

const dimensions = Dimensions.get('screen');

const stylesObj: any = {
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
};

const stylesSheet = StyleSheet.create(stylesObj);

export { stylesSheet, stylesObj };
