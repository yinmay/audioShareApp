import React, { FC } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from '@/assets/iconfont/index'
import Touchable from '@/components/Touchable'
import { IAlbum } from '@/models/album'

export interface Props {
	onPress: (item: IAlbum, index: number) => void
	item: IAlbum
	index: number
}

const Item: FC<Props> = props => {
	const { item, index } = props

	const onPress = () => {
		const { onPress, item, index } = props
		onPress(item, index)
	}

	return (
		<Touchable style={styles.item} onPress={onPress}>
			<View style={styles.left}>
				<Text style={styles.serial}>{index + 1}</Text>
			</View>
			<View style={styles.centerView}>
				<Text style={styles.title}>{item.title}</Text>
				<View style={styles.centerRight}>
					<View style={styles.volumeView}>
						<Text style={styles.otherText}>{item.playVolume}</Text>
					</View>
					<View style={styles.duration}>
						<Text style={styles.otherText}>{item.duration}</Text>
					</View>
				</View>
			</View>
			<View>
				<Text style={styles.date}>{item.date}</Text>
			</View>
		</Touchable>
	)
}

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		padding: 20,
		borderBottomWidth: StyleSheet.hairlineWidth,
		borderBottomColor: '#dedede',
	},
	left: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	serial: {
		color: '#838383',
		fontWeight: '800',
	},
	title: {
		fontWeight: '500',
		color: '#333',
		marginBottom: 15,
	},
	centerView: {
		flex: 1,
		marginHorizontal: 25,
	},
	centerRight: {
		flexDirection: 'row',
	},
	volumeView: {
		flexDirection: 'row',
		marginRight: 10,
	},
	duration: { flexDirection: 'row' },
	otherText: {
		marginHorizontal: 5,
		color: '#666',
	},
	date: {
		color: '#666',
	},
})

export default Item
