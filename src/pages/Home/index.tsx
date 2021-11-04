import React, { FC } from 'react'
import { View, Text, Button } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootStackNavigation } from '@/navigator/index'
import { RootState } from '@/models/index'
import Carousel from './Carousel'

const mapStateToProps = ({ home }: RootState) => ({
	num: home?.num,
})

const connector = connect(mapStateToProps)

type ModalState = ConnectedProps<typeof connector>
interface IProps extends ModalState {
	navigation: RootStackNavigation
}
const Home: FC<IProps> = props => {
	// const onPress = () => {
	// 	const { navigation } = props
	// 	navigation.navigate('Detail', { id: 100 })
	// }
	const onPress = () => {
		const { dispatch } = props
		dispatch({ type: 'home/add', payload: { num: 1 } })
	}
	const onPress2 = () => {
		const { dispatch } = props
		dispatch({ type: 'home/asyncAdd', payload: { num: 10 } })
	}
	return (
		<View>
			<Text>home {props.num} </Text>
			<Button title="plus" onPress={onPress} />
			<Button title="asyncplus" onPress={onPress2} />
			<Button title="Detail" onPress={onPress} />
			<Text>24323</Text>
			<Text>24323</Text>
			<Text>24323</Text>
			<View style={{ width: 400, height: 400 }}>
				<Carousel />
			</View>
			<Text>242</Text>
		</View>
	)
}

export default connector(Home)
