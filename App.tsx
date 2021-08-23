import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './components/MainNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
	return (
		<SafeAreaProvider>
			<NavigationContainer>
				<StatusBar barStyle={'light-content'} />
				<MainNavigation />
			</NavigationContainer>
		</SafeAreaProvider>
	);
};

export default App;
