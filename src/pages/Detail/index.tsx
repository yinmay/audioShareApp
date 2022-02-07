import { RouteProp } from '@react-navigation/native'
import React, { FC, useEffect } from 'react'
import { View, Text, StyleSheet, Animated, Platform } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import { RootStackNavigation, ModalStackParamList } from '@/navigator/index'
import { viewportWidth, statusBarHeight } from '@/utils/index'
import PlayBar from './PlayBar'

const IMAGE_WIDTH = 180

interface IProps {
	route: RouteProp<ModalStackParamList, 'Detail'>
}

const mapStateToProps = ({ player }: RootState) => ({
	currentAlbum: player.currentAlbum,
	playState: player.playState,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
	navigation: RootStackNavigation
	route: RouteProp<ModalStackParamList, 'Detail'>
}

const Detail: FC<IProps> = props => {
	const { route, dispatch, currentAlbum } = props
	useEffect(() => {
		dispatch({
			type: 'player/fetchShow',
			// payload: {
			// 	id: route.params.id, //fake data
			// },
		})
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.imageView}>
					<Animated.Image
						style={[styles.image]}
						source={{
							uri: currentAlbum.image,
						}}
					/>
				</View>
			</View>
			<PlayBar />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#807c66',
	},
	scroll: {
		flex: 1,
	},
	header: {
		position: 'absolute',
		right: 0,
		left: 0,
	},
	back: {
		marginTop: statusBarHeight,
		marginHorizontal: 20,
	},
	content: {
		paddingTop: 95,
		alignItems: 'center',
	},
	linear: {
		position: 'absolute',
		top: 0,
		height: viewportWidth + 100,
		width: viewportWidth,
	},
	barrage: {
		height: 400,
		top: 100,
	},
	title: {
		fontSize: 18,
		fontWeight: '900',
		color: '#fff',
	},
	imageView: {
		flexDirection: 'row',
		...Platform.select({
			ios: {
				shadowOffset: { width: 0, height: 5 },
				shadowOpacity: 0.5,
				shadowRadius: 10,
				shadowColor: '#000',
			},
		}),
		backgroundColor: '#fff',
		borderRadius: 8,
	},
	image: {
		width: IMAGE_WIDTH,
		height: IMAGE_WIDTH,
		borderRadius: 8,
	},
	control: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 15,
		marginHorizontal: 90,
	},
	thumb: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 76,
		height: 20,
	},
	danmuBtn: {
		marginLeft: 10,
		height: 20,
		width: 40,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		borderColor: '#fff',
		borderWidth: 1,
	},
	danmuText: {
		color: '#fff',
	},
})

export default connector(Detail)
