import React, { FC, useRef, useEffect } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Animated,
	FlatList,
	ListRenderItemInfo,
} from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import { IAlbum } from '@/models/album'
import Item from './Item'

const mapStateToProps = ({ album }: RootState) => ({
	list: album.list,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

const List: FC<ModelState> = props => {
	const { list } = props
	console.log(list, 'list=====')

	// const onPress = (item: IAlbum, index: number) => {
	// 	const { onItemPress } = props
	// 	onItemPress(item, index)
	// }
	const renderItem = ({ item, index }: ListRenderItemInfo<IAlbum>) => {
		return (
			<Item
				item={item}
				index={index}
				onPress={() => console.log(item, index)}
			/>
		)
	}
	return (
		<Animated.FlatList
			style={styles.container}
			data={list}
			renderItem={renderItem}
			bounces={false}
			scrollEventThrottle={1}
			// onScrollBeginDrag={onScrollBeginDrag}
		/>
	)
}

export default connector(List)

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
})
