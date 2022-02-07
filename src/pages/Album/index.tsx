import React, { FC, useEffect, useRef } from 'react'
import { RouteProp } from '@react-navigation/native'
import { View, Text, StyleSheet, Image, Animated } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { BlurView } from '@react-native-community/blur'
import { useHeaderHeight } from '@react-navigation/elements'

import {
	PanGestureHandler,
	PanGestureHandlerStateChangeEvent,
	State,
	TapGestureHandler,
	NativeViewGestureHandler,
} from 'react-native-gesture-handler'
import { viewportHeight } from '@/utils/index'

import { RootStackParamList, ModalStackNavigation } from '@/navigator/index'
import { RootState } from '@/models/index'
import Tab from './Tab'
import { IAlbum } from '@/models/album'

const coverRight = require('@/assets/images/cover-right.png')
const HEADER_HEIGHT = 260
const USE_NATIVE_DRIVER = true

const mapStateToProps = ({ album }: RootState) => ({
	data: album,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
	navigation: ModalStackNavigation
	route: RouteProp<RootStackParamList, 'Album'>
}

const Album: FC<IProps> = props => {
	const {
		route,
		dispatch,
		route: {
			params: {
				item: { id },
			},
		},
		data,
		navigation,
	} = props

	const headerHeight = useHeaderHeight()

	const RANGE = [-(HEADER_HEIGHT - headerHeight), 0]

	const translateYRef = useRef(new Animated.Value(0))
	const translationYVaueRef = useRef(0)
	const translateYOffsetRef = useRef(new Animated.Value(0))
	const translationYRef = useRef(new Animated.Value(0))
	translationYRef.current = Animated.add(
		translateYOffsetRef.current,
		translateYRef.current,
	)

	useEffect(() => {
		dispatch({
			type: 'album/fetchList',
		})
	}, [])

	useEffect(() => {}, [])

	const renderHeader = () => {
		const item = route.params.item
		return (
			<View style={[styles.header, { paddingTop: headerHeight }]}>
				<Image
					source={{ uri: item.image }}
					style={[StyleSheet.absoluteFillObject, styles.image]}
				/>
				<BlurView
					style={StyleSheet.absoluteFillObject}
					blurType="light"
					blurAmount={10}
				/>
				{/* )} */}
				<View style={styles.imageView}>
					<Image source={{ uri: item.image }} style={styles.thumbnail} />
					<Image
						source={coverRight}
						style={styles.coverRight}
						resizeMode="contain"
					/>
				</View>
				<View style={styles.headerRight}>
					<Text style={styles.title}>{data.title}</Text>
					<View style={styles.summary}>
						<Text style={styles.summaryText} numberOfLines={1}>
							{data.summary}
						</Text>
					</View>
					<View style={styles.author}>
						<Text style={styles.name}>{data.author.name}</Text>
					</View>
				</View>
			</View>
		)
	}

	const onGestureEvent = Animated.event(
		[{ nativeEvent: { translationY: translateYRef.current } }],
		{
			useNativeDriver: USE_NATIVE_DRIVER,
		},
	)
	const onHandlerStateChange = ({
		nativeEvent,
	}: PanGestureHandlerStateChangeEvent) => {
		if (nativeEvent.oldState === State.ACTIVE) {
			let { translationY } = nativeEvent
			//offset =value
			translateYOffsetRef.current.extractOffset() //clear value
			translateYOffsetRef.current.setValue(translationY) //reset value
			translateYOffsetRef.current.flattenOffset() //value = value + offset
			translateYRef.current.setValue(0)
			translationYVaueRef.current += translationY
			if (translationYVaueRef.current < RANGE[0]) {
				translationYVaueRef.current = RANGE[0]
				Animated.timing(translateYOffsetRef.current, {
					toValue: RANGE[0],
					duration: 1000,
					useNativeDriver: USE_NATIVE_DRIVER,
				}).start()
			} else if (translationYVaueRef.current > RANGE[1]) {
				translationYVaueRef.current = RANGE[1]
				Animated.timing(translateYOffsetRef.current, {
					toValue: RANGE[1],
					duration: 1000,
					useNativeDriver: USE_NATIVE_DRIVER,
				}).start()
			}
		}
	}

	const onItemPress = (album: IAlbum, index: number) => {
		const item = route.params.item

		dispatch({
			type: 'player/setState',
			payload: {
				currentAlbum: { ...album, image: item.image },
			},
		})
		navigation.navigate('Detail', { id: item.id })
	}
	return (
		<PanGestureHandler
			onGestureEvent={onGestureEvent}
			onHandlerStateChange={onHandlerStateChange}>
			<Animated.View
				style={[
					styles.container,
					{
						transform: [
							{
								translateY: translationYRef.current.interpolate({
									inputRange: RANGE,
									outputRange: RANGE,
									extrapolate: 'extend',
								}),
							},
						],
					},
				]}>
				{renderHeader()}
				<View style={[styles.tab, { height: viewportHeight - headerHeight }]}>
					<Tab onItemPress={onItemPress} />
				</View>
			</Animated.View>
		</PanGestureHandler>
	)
}

export default connector(Album)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	image: {
		backgroundColor: '#eee',
	},
	header: {
		height: HEADER_HEIGHT,
		flexDirection: 'row',
		paddingHorizontal: 20,
		// backgroundColor: 'red',
	},
	headerRight: {
		flex: 1,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: 'rgba(255, 255, 255, 0.4)',
	},
	coverRight: { height: 98, position: 'absolute', right: -23 },
	tab: {
		backgroundColor: '#fff',
	},
	imageView: {
		marginRight: 26,
		alignItems: 'center',
		flexDirection: 'row',
	},
	thumbnail: {
		height: 98,
		width: 98,
		borderColor: '#fff',
		borderWidth: StyleSheet.hairlineWidth,
		borderRadius: 8,
		backgroundColor: '#fff',
	},
	title: {
		fontSize: 18,
		fontWeight: '900',
		color: '#fff',
	},
	summary: {
		width: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		padding: 10,
		marginVertical: 10,
		borderRadius: 4,
	},
	summaryText: {
		color: '#fff',
		fontSize: 12,
	},
	author: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10,
	},
	avatar: {
		borderRadius: 13,
		height: 26,
		width: 26,
		marginRight: 8,
	},
	name: {
		color: '#fff',
		fontSize: 12,
	},
})
