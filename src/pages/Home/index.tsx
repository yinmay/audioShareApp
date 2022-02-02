import React, { FC, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Dispatch } from 'redux'

import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator/index'
import { RootState } from '@/models/index'
import Carousel from './Carousel'
import Guess from './Guess'

const mapStateToProps = ({ home }: RootState) => ({
	carouselImages: home?.carouselImages,
	guessList: home?.guessList,
})

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector>
interface IProps extends ModalState {
	navigation: RootStackNavigation
	dispatch: Dispatch
}
const Home: FC<IProps> = props => {
	const { dispatch, carouselImages = [], guessList } = props

	useEffect(() => {
		dispatch({ type: 'home/getCarouselImages' })
		dispatch({ type: 'home/getGuessList' })
	}, [])

	const onPress = () => {
		alert('ok')
	}

	return (
		<ScrollView>
			<View style={styles.header}>
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.headerTitle}>Guess what you like</Text>
				</View>
				<View style={{ flexDirection: 'row' }}>
					<Text style={styles.moreTitle}>More</Text>
				</View>
			</View>
			<View style={{ width: 400, height: 200 }}>
				<Carousel data={carouselImages} />
			</View>
			<Guess list={guessList} onPress={onPress} {...props} />
		</ScrollView>
	)
}

export default connector(Home)

const styles = StyleSheet.create({
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
