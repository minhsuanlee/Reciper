import React from 'react';
import {
	FlatList,
	SafeAreaView,
	Dimensions,
	TouchableOpacity,
	View,
	StyleSheet,
} from 'react-native';
import { Button, Text, Input } from 'react-native-elements';

// components
import { ActionIcon } from '../components';

class DetailsScreen extends React.Component {
	state = {
		ingredients: this.props.navigation.getParam('ingredients', []),
		input: '',
		error: '',
		incompatibles: [],
	};

	delete = ingredient => {
		this.setState({
			ingredients: this.state.ingredients.filter(
				ing => ing !== ingredient,
			),
			error: `Ingredient: ${ingredient} was removed`,
		});
	};

	onChangeText = text => {
		this.setState({ input: text });
	};

	addIngredient = () => {
		const { ingredients, input } = this.state;
		const input_ = input.toLowerCase();
		if (ingredients.includes(input_)) {
			this.setState({
				error: `Ingredient: ${input_} is already included`,
			});
		} else {
			this.setState({
				ingredients: [...ingredients, input_],
				error: `Ingredient: ${input_} has been added`,
			});
		}
	};

	analyze = async () => {
		// console.log(this.state.ingredients.length);
		const ingredients =
			this.state.ingredients.length > 0
				? this.state.ingredients.reduce(
						(acc, current) => `${acc},${current}`,
				  )
				: '';
		// console.log('in', ingredients);
		await fetch(`http://35.224.59.96:8081/list?data=${ingredients}`, {
			method: 'GET',
		})
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					incompatibles: JSON.parse(JSON.stringify(responseJson)),
				});
				// console.log(this.state.incompatibles);
			})
			.catch(error => {
				console.error(error);
			});
		const { navigation } = this.props;
		navigation.navigate('AnalysisScreen', {
			ingredients,
			incompatibles: this.state.incompatibles,
		});
	};

	render() {
		const { ingredients, error } = this.state;
		const formatIngreds =
			ingredients.length !== 0
				? ingredients.sort().map((ingredient, index) => ({
						id: index,
						name: ingredient,
				  }))
				: [];

		return (
			<SafeAreaView style={styles.container}>
				<View style={{ height: '90%', width: '100%' }}>
					<Input
						label="Add Ingredient:"
						placeholder="Input Ingredients Here..."
						rightIcon={
							<Button title="Add" onPress={this.addIngredient} />
						}
						onChangeText={this.onChangeText}
					/>
					<Text
						style={{
							fontSize: 15,
							color: 'red',
							textAlign: 'center',
						}}
					>
						{error}
					</Text>
					<Text style={{ fontSize: 15 }}>
						Click ingredients below to remove
					</Text>
					<FlatList
						data={formatIngreds}
						renderItem={({ item }) => (
							<Button
								title={item.name}
								icon={
									<ActionIcon
										name="close"
										size={10}
										isCircled={true}
										onPress={() => this.delete(item.name)}
									/>
								}
								iconRight={true}
								titleStyle={{ fontSize: 25 }}
								buttonStyle={{
									justifyContent: 'space-between',
									paddingHorizontal: 20,
								}}
								containerStyle={{ marginVertical: 5 }}
								onPress={() => this.delete(item.name)}
							/>
						)}
						keyExtractor={item => `${item.id}`}
						style={{
							alignSelf: 'stretch',
							// height: Dimensions.get('window').height * 0.5,
						}}
					/>
				</View>
				<TouchableOpacity
					style={{
						flex: 1,
						alignItems: 'center',
						justifyContent: 'center',
						backgroundColor: 'green',
						alignSelf: 'stretch',
					}}
					onPress={this.analyze}
				>
					<ActionIcon
						title="Analyze"
						name="timeline"
						size={40}
						onPress={this.analyze}
						backgroundColor="green"
						// isCircled={true}
					/>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center' },
});

export default DetailsScreen;
