import React, { FC, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator/index'
import { RootState } from '@/models/index'
import Carousel from './Carousel'

const mapStateToProps = ({ home }: RootState) => ({
	num: home?.num,
	carouselData: home?.carouselData,
})

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector>
interface IProps extends ModalState {
	navigation: RootStackNavigation
	carouselData: string[]
}
const Home: FC<IProps> = props => {
	const { dispatch, carouselData = [] } = props
	useEffect(() => dispatch({ type: 'home/add' }), [])

	return (
		<View>
			<View style={{ width: 400, height: 400 }}>
				<Carousel data={carouselData} />
			</View>
		</View>
	)
}

export default connector(Home)
