import React from 'react';
import {
	FlatList,
	SafeAreaView,
	SectionList,
	View,
	StyleSheet,
	TouchableOpacity,
	Image,
} from 'react-native';
import { Text, ListItem } from 'react-native-elements';

// components
import { ActionIcon } from '../components';
import { key } from '../apiKey';

class AnalysisScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		return {
			title: navigation.getParam('hasIncompatibles')
				? 'Incompatibles'
				: 'Recipes',
		};
	};

	componentDidMount = () => {
		this.props.navigation.setParams({
			hasIncompatibles: this.state.incompatibles.length !== 0,
		});
	};

	state = {
		incompatibles: this.props.navigation.getParam('incompatibles', []),
		ingredients: this.props.navigation.getParam('ingredients', ''),
		recipes: [],
	};

	compareTo = (obj1, obj2) => {
		return obj1.likes - obj2.likes;
	};

	getRecipes = async () => {
		fetch(
			`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${key}&ingredients=${this.state.ingredients}`,
			{
				method: 'GET',
			},
		)
			.then(response => response.json())
			.then(responseJson => {
				console.log(responseJson);
				this.setState({
					recipes: responseJson,
				});
			})
			.catch(error => {
				console.error(error);
			});
	};

	renderRecipes = item => {
		const { title, image } = item;

		return (
			<TouchableOpacity
				onPress={() =>
					this.props.navigation.navigate('RecipeDetailScreen', {
						recipe: item,
					})
				}
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					backgroundColor: '#ADFF2F',
				}}
			>
				<Image
					style={{ height: 100, width: 100 }}
					source={{ uri: image }}
				/>
				<Text
					style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 10 }}
				>
					{title}
				</Text>
			</TouchableOpacity>
		);
	};

	renderIncompatibles = item => {
		return <ListItem title={item} titleStyle={styles.subitem} />;
	};

	render() {
		const { incompatibles, recipes } = this.state;

		return (
			<SafeAreaView style={styles.container}>
				{incompatibles.length === 0 ? (
					<View style={{ flex: 1 }}>
						<View style={{ flex: 0.9 }}>
							<FlatList
								data={recipes.sort(this.compareTo)}
								renderItem={({ item }) =>
									this.renderRecipes(item)
								}
								keyExtractor={item => `${item.id}`}
								ItemSeparatorComponent={() => (
									<View
										style={{
											height: 5,
										}}
									/>
								)}
							/>
						</View>
						<View style={{ flex: 0.1 }}>
							<ActionIcon
								title="Get Recipes"
								name="done"
								size={40}
								onPress={this.getRecipes}
								backgroundColor="green"
							/>
						</View>
					</View>
				) : (
					<SectionList
						sections={incompatibles}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) =>
							this.renderIncompatibles(item)
						}
						renderSectionHeader={({ section: { title } }) => (
							<Text style={styles.title}>{title}</Text>
						)}
					/>
				)}
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	title: { fontSize: 25, fontWeight: 'bold' },
	subitem: { fontSize: 15 },
});

export default AnalysisScreen;
