import React from 'react';
import { Image, View, SectionList, StyleSheet } from 'react-native';
import { Text, ListItem } from 'react-native-elements';

class RecipeDetailScreen extends React.Component {
	state = {
		recipe: this.props.navigation.getParam('recipe'),
	};

	renderItem = ({ original, image }) => {
		return (
			<ListItem
				title={original}
				leftAvatar={{ source: { uri: image } }}
				titleStyle={styles.subitem}
			/>
		);
	};

	render() {
		const {
			id,
			title,
			image,
			missedIngredients,
			usedIngredients,
		} = this.state.recipe;

		const ingredients = [
			{ title: 'Used Ingredients', data: usedIngredients },
			{ title: 'Missing Ingredients', data: missedIngredients },
		];

		return (
			<View>
				<View style={{ flexDirection: 'row', alignItems: 'center' }}>
					<Image
						style={{ height: 100, width: 100 }}
						source={{ uri: image }}
					/>
					<Text style={styles.title}>{title}</Text>
				</View>
				<SectionList
					sections={ingredients}
					keyExtractor={(item, index) => item + index}
					renderItem={({ item }) => this.renderItem(item)}
					renderSectionHeader={({ section: { title } }) => (
						<Text style={styles.item}>{title}</Text>
					)}
					ItemSeparatorComponent={() => (
						<View style={{ height: 10 }} />
					)}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: { fontSize: 25, fontWeight: 'bold', marginLeft: 10 },
	item: { fontSize: 20, fontWeight: 'bold' },
	subitem: { fontSize: 15 },
});

export default RecipeDetailScreen;
