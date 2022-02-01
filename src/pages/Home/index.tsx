import React, { FC, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
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
	return (
		<View>
			<View style={{ width: 400, height: 400 }}>
				<Carousel data={carouselImages} />
			</View>
			<Guess list={guessList} />
		</View>
	)
}

export default connector(Home)
