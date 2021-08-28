import React, { FC } from 'react'
import { View, Text, Button } from 'react-native'

import { RootStackNavigation } from '@/navigator'
interface IProps {
	navigation: RootStackNavigation
}
const Listen: FC<IProps> = props => {
	// const onPress = () => {
	// 	const { navigation } = props
	// 	navigation.navigate('Detail', { id: 100 })
	// }
	return (
		<View>
			<Text>Listen </Text>
			{/* <Button title="Detail" onPress={onPress} /> */}
		</View>
	)
}

export default Listen
