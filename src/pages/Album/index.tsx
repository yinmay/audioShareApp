import React, { FC, useEffect, useRef } from 'react'
import { RouteProp } from '@react-navigation/native'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { BlurView } from '@react-native-community/blur'
import { viewportHeight } from '@/utils/index'

import { RootStackParamList, ModalStackNavigation } from '@/navigator/index'
import { RootState } from '@/models/index'
import Tab from './Tab'

import { useHeaderHeight } from '@react-navigation/elements'
const coverRight = require('@/assets/images/cover-right.png')
const HEADER_HEIGHT = 260

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
	} = props
	useEffect(() => {
		dispatch({
			type: 'album/fetchList',
		})
	}, [])

	const headerHeight = useHeaderHeight()

	const renderHeader = () => {
		const item = route.params.item
		return (
			<View style={[styles.header, { paddingTop: headerHeight }]}>
				<Image
					source={{ uri: item.image }}
					// ref={backgroundImage}
					// onLoadEnd={this.imageLoaded}
					style={[StyleSheet.absoluteFillObject, styles.image]}
				/>
				{/* {this.state.viewRef && ( */}
				<BlurView
					style={StyleSheet.absoluteFillObject}
					// viewRef={this.state.viewRef}
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
	return (
		<View style={styles.container}>
			{renderHeader()}
			<View style={[styles.tab, { height: viewportHeight - headerHeight }]}>
				<Tab
				// nativeRef={nativeRef}
				// tapRef={tapRef}
				// panRef={panRef}
				// route={route}
				// onScrollBeginDrag={onScrollBeginDrag}
				// onItemPress={onItemPress}
				/>
			</View>
		</View>
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
