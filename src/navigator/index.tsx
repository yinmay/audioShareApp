import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '@/pages/home'
import Detail from '@/pages/detail'

type RootStackParamList = {
	Home: undefined
	Detail: undefined
}

const Stack = createStackNavigator<RootStackParamList>()

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Detail" component={Detail} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigator
