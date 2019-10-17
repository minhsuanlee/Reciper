import React from 'react';
import { Dimensions, Image, View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as ImageManipulator from 'expo-image-manipulator';

// components
import { ActionIcon, CustomHeader } from '../components';

class MainScreen extends React.Component {
	// static navigationOptions = ({ navigation }) => {
	// 	return {
	// 		header: props => {
	// 			return (
	// 				<CustomHeader
	// 					centerComponent={
	// 						<Text style={{ color: 'white', fontSize: 20 }}>
	// 							Reciper
	// 						</Text>
	// 					}
	// 					rightComponent={
	// 						<ActionIcon
	// 							name="chevron-right"
	// 							size={35}
	// 							onPress={this.togglePhotoMode}
	// 							backgroundColor="transparent"
	//               disabled={!navigation.getParam('hasImage')}
	//               onPress={navigation.navigate('')}
	// 						/>
	// 					}
	// 					{...props}
	// 				/>
	// 			);
	// 		},
	// 	};
	// };

	state = {
		hasCameraPermission: null,
		type: Camera.Constants.Type.back,
		isCameraMode: false,
		photo: null,
		photo64: null,
		ingredients: [],
		error: '',
	};

	async componentDidMount() {
		const { navigation } = this.props;
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
		navigation.setParams({ hasImage: false });
	}

	togglePhotoMode = () => {
		this.setState({ isCameraMode: !this.state.isCameraMode });
	};

	snap = async () => {
		const { navigation } = this.props;
		if (this.camera) {
			const { uri } = await this.camera.takePictureAsync();
			const photo = (
				<Image
					style={{
						flex: 1,
					}}
					source={{
						uri: uri,
					}}
					resizeMode="contain"
				/>
			);
			const photo64_ = await ImageManipulator.manipulateAsync(
				uri,
				[{ resize: { width: 480, height: 640 } }],
				{ format: ImageManipulator.SaveFormat.JPEG, base64: true },
			);
			this.setState({
				photo64: photo64_.base64,
			});
			navigation.setParams({ hasImage: true });
			this.setState({ photo }, this.togglePhotoMode);
		}
	};

	flipCamera = () => {
		this.setState({
			type:
				this.state.type === Camera.Constants.Type.back
					? Camera.Constants.Type.front
					: Camera.Constants.Type.back,
		});
	};

	showDetails = async () => {
		await fetch(
			`http://35.224.59.96:8081/classify?imgData=data:image/jpeg;base64,${this.state.photo64}`,
			{
				method: 'GET',
			},
		)
			.then(response => response.json())
			.then(responseJson => {
				this.setState({
					ingredients: JSON.parse(JSON.stringify(responseJson)),
				});
			})
			.catch(error => {
				console.log('error', error);
				this.setState(
					{ error: JSON.stringify(error) },
					console.log(this.state.error),
				);
			});
		if (this.state.error.length === 0) {
			const { navigation } = this.props;
			navigation.navigate('DetailsScreen', {
				ingredients: this.state.ingredients,
			});
		}
	};

	render() {
		const {
			hasCameraPermission,
			isCameraMode,
			type,
			photo,
			error,
		} = this.state;
		const { height, width } = Dimensions.get('window');

		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>Access to camera not granted</Text>;
		} else {
			return (
				<View style={styles.container}>
					{isCameraMode ? (
						<Camera
							style={{ flex: 1 }}
							type={type}
							ref={ref => {
								this.camera = ref;
							}}
						>
							<View style={styles.cameraView}>
								<View style={styles.close}>
									<ActionIcon
										name="close"
										size={35}
										onPress={this.togglePhotoMode}
										backgroundColor="transparent"
									/>
									<ActionIcon
										name="swap-horiz"
										size={35}
										onPress={this.flipCamera}
										backgroundColor="transparent"
									/>
								</View>
								<View
									style={{
										flex: 0.7,
									}}
								/>
								<View style={styles.snap}>
									<ActionIcon
										name="photo-camera"
										size={40}
										onPress={this.snap}
										isCircled={true}
									/>
								</View>
							</View>
						</Camera>
					) : (
						<View style={styles.innerContainer}>
							<View
								style={[
									styles.emptyBox,
									{
										height: 0.6 * height,
										width: 0.9 * width,
									},
								]}
							>
								{photo}
							</View>
							<View style={styles.analyze}>
								<ActionIcon
									title="Camera"
									name="add-a-photo"
									size={40}
									onPress={this.togglePhotoMode}
									isCircled={true}
								/>
								<ActionIcon
									title="Details"
									name="description"
									size={40}
									onPress={this.showDetails}
									isCircled={true}
									disabled={!photo}
									color={!photo ? 'gray' : 'white'}
								/>
							</View>
						</View>
					)}
					{error !== '' && (
						<Text style={{ color: 'red', fontSize: 10 }}>
							{error}
						</Text>
					)}
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	emptyBox: {
		marginVertical: 20,
		borderStyle: 'dashed',
		borderWidth: 1,
		backgroundColor: '#D0D0D0',
	},
	innerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	cameraView: {
		flex: 1,
		backgroundColor: 'transparent',
		flexDirection: 'column',
	},
	close: {
		flex: 0.1,
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'space-between',
		marginHorizontal: 10,
	},
	snap: {
		flex: 0.2,
		alignSelf: 'center',
	},
	analyze: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
});

export default MainScreen;
