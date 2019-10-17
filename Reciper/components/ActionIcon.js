import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const ActionIcon = ({
	name,
	size,
	color,
	title,
	onPress,
	isCircled,
	backgroundColor,
	disabled,
}) => {
	const outline = isCircled
		? {
				height: size * 2,
				width: size * 2,
				borderRadius: size,
				borderColor: color,
				borderWidth: 1,
		  }
		: {};

	return (
		<TouchableOpacity
			style={[
				styles.container,
				outline,
				{ backgroundColor: backgroundColor },
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<MaterialIcons name={name} size={size} color={color} />
			{title ? <Text style={{ color: color }}>{title}</Text> : null}
		</TouchableOpacity>
	);
};

ActionIcon.defaultProps = {
	title: '',
	isCircled: false,
	onPress: () => {},
	color: 'white',
	backgroundColor: 'black',
	disabled: false,
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'column',
		alignItems: 'center',
		alignContent: 'center',
		justifyContent: 'center',
	},
});

export default ActionIcon;
