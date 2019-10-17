import React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import { Header } from 'react-native-elements';
import Constants from 'expo-constants';

const CustomHeader = ({ leftComponent, centerComponent, rightComponent }) => {
	return (
		<Header
			leftComponent={leftComponent}
			centerComponent={centerComponent}
			rightComponent={rightComponent}
			backgroundColor="green"
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: 'white',
	},
});

export default CustomHeader;
