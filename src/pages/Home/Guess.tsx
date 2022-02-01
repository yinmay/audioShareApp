import React, { FC } from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	ScrollView,
} from 'react-native'
import { GuessItem } from '../../models/index'
interface IProps {
	list: GuessItem[]
}

export const Guess: FC<IProps> = ({ list }) => {
	const renderItem = ({ item }: { GuessItem }) => (
		<View style={styles.item}>
			<Image source={{ uri: item.image }} style={styles.thumbnail} />
			<View style={styles.rightContainer}>
				<Text style={styles.title} numberOfLines={2}>
					{item.title}
				</Text>
			</View>
		</View>
	)
	return (
		<View style={styles.container123}>
			<FlatList
				numColumns={3}
				data={list}
				renderItem={renderItem}
				keyExtractor={item => item.id}
				style={styles.list}
			/>
		</View>
	)
}

export default Guess

const styles = StyleSheet.create({
	container123: {
		backgroundColor: '#f0f0f0',
	},
	red: {
		backgroundColor: 'red',
		height: 60,
		width: 60,
		margin: 5,
	},
	yellow: {
		backgroundColor: 'yellow',
		height: 60,
		width: 60,
		margin: 5,
	},
	blue: {
		backgroundColor: 'blue',
		height: 60,
		width: 60,
		margin: 5,
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
		flexDirection: 'column',
	},
	thumbnail: {
		width: '100%',
		height: 100,
		borderRadius: 8,
		marginBottom: 10,
		backgroundColor: '#dedede',
	},
	item: {
		flex: 1,
		marginVertical: 6,
		marginHorizontal: 5,
	},
	list: {
		paddingTop: 10,
		paddingHorizontal: 10,
		flexDirection: 'column',
		display: 'flex',
	},
	rightContainer: {
		flex: 1,
	},
	title: {
		textAlign: 'center',
	},
})
