import React, { FC } from 'react'
import { View, Text, Button } from 'react-native'

import { RootStackNavigation } from '@/navigator/index'
interface IProps {
	navigation: RootStackNavigation
}
const Account: FC<IProps> = props => {
	// const onPress = () => {
	// 	const { navigation } = props
	// 	navigation.navigate('Detail', { id: 100 })
	// }
	return (
		<View>
			<Text>Account </Text>
			{/* <Button title="Detail" onPress={onPress} /> */}
		</View>
	)
}

export default Account
