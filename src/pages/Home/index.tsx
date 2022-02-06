import React, { FC, useEffect } from 'react'
import {
	View,
	Text,
	StyleSheet,
	FlatList,
	NativeSyntheticEvent,
	NativeScrollEvent,
	ListRenderItemInfo,
} from 'react-native'
import { Dispatch } from 'redux'
import ChannelItem from './ChannelItem'
import Empty from '@/components/Empty'
import { sideHeight } from './Carousel'
import { HomeTabParamList } from '@/navigator/HomeTabs'

import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator/index'
import { RootState, IChannel, IGuess } from '@/models/index'
import Carousel from './Carousel'
import Guess from './Guess'
import { RouteProp } from '@react-navigation/native'

const mapStateToProps = (
	state: RootState,
	{ route }: { route: RouteProp<HomeTabParamList, string> },
) => {
	const modelNamespace = route.params.modelNamespace
	const modelState = state[modelNamespace]
	return {
		modelNamespace,
		carouselImages: modelState?.carouselImages,
		guessList: modelState?.guessList,
		channels: modelState?.channels,
		gradientVisible: modelState?.gradientVisible,
		refreshing: modelState?.refreshing,
		hasMore: modelState?.hasMore,
	}
}

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
		modelNamespace,
		navigation,
	} = props
	const loadChannelData = payload => {
		if (hasMore) {
			dispatch({
				type: `${modelNamespace}/fetchChannelList`,
				payload: { ...payload },
			})
		}
	}

	useEffect(() => {
		dispatch({ type: `${modelNamespace}/fetchCarouselImages` })
		dispatch({ type: `${modelNamespace}/fetchGuessList` })
		loadChannelData({ loadMore: false, efreshing: true })
	}, [])

	const goAlbum = (item: IChannel | IGuess) => {
		navigation.navigate('Album', { item })
	}

	const renderItem = ({ item }: ListRenderItemInfo<IChannel>) => {
		return <ChannelItem item={item} onPress={goAlbum} />
	}

	const onEndReached = () => {
		loadChannelData({ loadMore: true, refreshing: true })
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
				type: `${modelNamespace}/setState`,
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
				<Guess
					list={guessList}
					modelNamespace={modelNamespace}
					onPress={goAlbum}
					{...props}
				/>
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
