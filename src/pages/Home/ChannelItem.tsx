import React, { FC } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Touchable from '@/components/Touchable'
import { IChannel } from '@/models/index'
import Icon from '@/assets/iconfont/index'

interface IProps {
	item: IChannel
	onPress: (item: IChannel) => void
}

const ChannelItem: FC<IProps> = ({ item, onPress = () => {} }) => {
	return (
		<Touchable onPress={() => onPress(item)} style={styles.container}>
			<View style={styles.item}>
				<Image source={{ uri: item.image }} style={styles.image} />
				<View style={styles.rightView}>
					<View style={{ flex: 1 }}>
						<Text style={styles.titleText} numberOfLines={2}>
							{item.title}
						</Text>
						<Text style={styles.remarkText} numberOfLines={2}>
							{item.remark}
						</Text>
					</View>

					<View style={styles.bottomView}>
						<View style={styles.playedView}>
							<Icon name="icon-rnApplisten" size={14} color="#f86442" />
							<Text style={{ marginLeft: 5 }}>{item.played}</Text>
						</View>
						<View style={styles.playingView}>
							<Icon name="icon-rnAppshengyin" size={14} color="#f86442" />
							<Text style={{ marginLeft: 5 }}>{item.playing}</Text>
						</View>
					</View>
				</View>
			</View>
		</Touchable>
	)
}

export default ChannelItem

const styles = StyleSheet.create({
	container: {
		// backgroundColor: '#fff',
	},
	item: {
		flexDirection: 'row',
		margin: 10,
		padding: 10,
		borderRadius: 8,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.5,
		shadowRadius: 10,
		shadowColor: '#ccc',
		elevation: 80,
		backgroundColor: '#fff',
	},
	image: {
		width: 100,
		height: 100,
		borderRadius: 8,
		marginRight: 10,
		backgroundColor: '#dedede',
	},
	rightView: {
		flex: 1,
	},
	titleText: {
		fontSize: 16,
		marginBottom: 10,
	},
	remarkText: {
		backgroundColor: '#f8f8f9',
		padding: 5,
	},
	bottomView: {
		flexDirection: 'row',
		alignContent: 'flex-end',
	},
	playedView: {
		flexDirection: 'row',
		alignItems: 'center',
		marginRight: 20,
	},
	playingView: {
		flexDirection: 'row',
		alignItems: 'center',
	},
})
