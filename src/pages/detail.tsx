import { RouteProp } from '@react-navigation/native'
import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { RootStackParamList } from '@/navigator/index'

interface IProps {
	route: RouteProp<RootStackParamList, 'Detail'>
}

const detail: FC<IProps> = props => {
	const { route } = props
	console.log(route.params, '==========================')
	return (
		<View>
			<Text>detail</Text>
			<Text>{route.params.id}</Text>
		</View>
	)
}

export default detail
