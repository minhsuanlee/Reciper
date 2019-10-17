import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import * as screens from './screens';

const AppNavigator = createStackNavigator({
	MainScreen: {
		screen: screens.MainScreen,
		navigationOptions: () => ({
			title: 'Reciper',
		}),
	},
	DetailsScreen: {
		screen: screens.DetailsScreen,
		navigationOptions: () => ({
			title: 'Details',
		}),
	},
	AnalysisScreen: {
		screen: screens.AnalysisScreen,
		navigationOptions: () => ({}),
	},
	RecipeDetailScreen: {
		screen: screens.RecipeDetailScreen,
		navigationOptions: () => ({
			title: 'Recipe Details',
		}),
	},
});

export default createAppContainer(AppNavigator);
