import React, { PureComponent } from 'react';
import Home from '../screens/Home';
import Detail from '../screens/Detail';
import HeaderNavigationDetail from './HeaderNavigationDetail';
import HeaderNavigationHome from './HeaderNavigationHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from '../screens/Search';

const Stack = createNativeStackNavigator();

class MainNavigation extends PureComponent {
	render() {
		return (
			<Stack.Navigator>
				<Stack.Screen
					name={'Home'}
					component={Home}
					options={{
						headerTransparent: true,
						header: ({ navigation }) => <HeaderNavigationHome navigation={navigation} />,
					}}
				/>

				<Stack.Screen
					name={'Detail'}
					component={Detail}
					options={{
						headerTransparent: true,
						headerTitle: '',
						headerBackTitleVisible: false,
						// header: ({ navigation }) => <HeaderNavigationDetail navigation={navigation} />,
					}}
				/>

				<Stack.Screen
					name={'Search'}
					component={Search}
					options={{
						headerTransparent: true,
						headerTitle: '',
						headerBackTitleVisible: false,
						// header: ({ navigation }) => <HeaderNavigationDetail navigation={navigation} />,
					}}
				/>
			</Stack.Navigator>
		);
	}
}

export default MainNavigation;
