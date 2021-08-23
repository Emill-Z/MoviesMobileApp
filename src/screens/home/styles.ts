import { StyleSheet } from 'react-native';
import { Color } from '../../common/core/themes/theme';

const stylesObj = {
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
};

const stylesSheet = StyleSheet.create(stylesObj);

export { stylesSheet, stylesObj };
