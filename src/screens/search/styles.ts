import { Dimensions, StyleSheet } from 'react-native';
import { Color } from '../../common/core/themes/theme';

const dimensions = Dimensions.get('screen');
const headHeight = 200;

const stylesObj: any = {
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
};

const stylesSheet = StyleSheet.create(stylesObj);

export { stylesSheet, stylesObj };
