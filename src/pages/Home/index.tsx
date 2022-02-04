import React, { FC, useEffect, useState } from 'react'
import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	FlatList,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ListRenderItemInfo,
} from 'react-native'
import { Dispatch } from 'redux'
import ChannelItem from './ChannelItem'
import Empty from '@/components/Empty'
import { sideHeight } from './Carousel'

import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator/index'
import { RootState, IChannel } from '@/models/index'
import Carousel from './Carousel'
import Guess from './Guess'

const mapStateToProps = ({ home }: RootState) => ({
	carouselImages: home?.carouselImages,
	guessList: home?.guessList,
	channels: home?.channels,
	gradientVisible: home?.gradientVisible,
	refreshing: home?.refreshing,
	hasMore: home?.hasMore,
})

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector>
interface IProps extends ModalState {
	navigation: RootStackNavigation
	dispatch: Dispatch
}
const Home: FC<IProps> = props => {
	const {
		dispatch,
		carouselImages = [],
		guessList,
		channels,
		refreshing,
		hasMore,
	} = props
	const loadChannelData = payload => {
		if (hasMore) {
			dispatch({ type: 'home/fetchChannelList', payload: { ...payload } })
		}
	}

	useEffect(() => {
		dispatch({ type: 'home/fetchCarouselImages' })
		dispatch({ type: 'home/fetchGuessList' })
		loadChannelData({ loadMore: false })
	}, [])

	const onPress = () => {
		alert('ok')
	}

	const renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
		return <ChannelItem item={item} onPress={onPress} />
	}

	const onEndReached = () => {
		loadChannelData({ loadMore: true })
	}

	const renderEmpty = () => {
		return <Empty />
	}

	const onRefresh = () => {
		loadChannelData({ refreshing: true })
	}

	const onScroll = ({
		nativeEvent,
	}: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { dispatch, gradientVisible } = props

		let newGradientVisible = nativeEvent.contentOffset.y < sideHeight
		if (gradientVisible !== newGradientVisible) {
			dispatch({
				type: `home/setState`,
				payload: {
					gradientVisible: newGradientVisible,
				},
			})
		}
	}

	const Header = () => {
		return (
			<View>
				<View style={{ width: 400, height: 400 }}>
					<Carousel data={carouselImages} />
				</View>
				<View style={styles.header}>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.headerTitle}>Guess what you like</Text>
					</View>
					<View style={{ flexDirection: 'row' }}>
						<Text style={styles.moreTitle}>More</Text>
					</View>
				</View>
				<Guess list={guessList} onPress={onPress} {...props} />
			</View>
		)
	}

	const Footer = () => {
		const { hasMore } = props
		if (hasMore) {
			return (
				<View style={styles.text}>
					<Text>loading</Text>
				</View>
			)
		}

		return (
			<View style={styles.text}>
				<Text>End</Text>
			</View>
		)
	}

	return (
		// <ScrollView>
		<FlatList
			ListHeaderComponent={Header}
			data={channels}
			renderItem={renderItem}
			keyExtractor={(item: IChannel) => `item-${item.id}`}
			onEndReached={onEndReached}
			onEndReachedThreshold={0.1}
			ListEmptyComponent={renderEmpty}
			onScroll={onScroll}
			refreshing={refreshing}
			onRefresh={onRefresh}
			ListFooterComponent={Footer}
		/>
		// </ScrollView>
	)
}

export default connector(Home)

const styles = StyleSheet.create({
	text: {
		padding: 10,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		backgroundColor: '#ffffff',
		borderRadius: 8,
		margin: 16,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		shadowColor: '#ccc',
		elevation: 4,
	},
	header: {
		padding: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		borderBottomColor: '#efefef',
		borderBottomWidth: StyleSheet.hairlineWidth,
	},
	headerTitle: {
		marginLeft: 5,
		color: '#333333',
	},
	moreTitle: {
		color: '#6f6f6f',
	},
})
