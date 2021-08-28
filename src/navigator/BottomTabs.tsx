import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '@/pages/Home'
import Listen from '@/pages/Listen'
import Found from '@/pages/Found'
import Account from '@/pages/Account'

export type BottomTabParamList = {
	Home: undefined
	Listen: undefined
	Found: undefined
	Account: undefined
}

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>()

const BottomTabs = () => {
	return (
		// <NavigationContainer>
		<Tab.Navigator activeColor="#e91e63" barStyle={{ backgroundColor: 'grey' }}>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ tabBarLabel: 'Home' }}
			/>
			<Tab.Screen
				name="Listen"
				component={Listen}
				options={{ tabBarLabel: 'Listen' }}
			/>
			<Tab.Screen name="Found" component={Found} />
			<Tab.Screen name="Account" component={Account} />
		</Tab.Navigator>
		// </NavigationContainer>
	)
}

export default BottomTabs
