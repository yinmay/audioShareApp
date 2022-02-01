import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Home from '@/pages/Home'
const Tab = createMaterialTopTabNavigator()

const HomeTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				lazy: true,
				tabBarScrollEnabled: true,
				tabBarActiveTintColor: '#e91e63',
				headerStatusBarHeight: StatusBar.currentHeight,
				tabBarItemStyle: {
					width: 80,
				},
			}}>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{ tabBarLabel: '123' }}></Tab.Screen>
			<Tab.Screen name="Home2" component={Home}></Tab.Screen>
			<Tab.Screen name="Home3" component={Home}></Tab.Screen>
			<Tab.Screen name="Home4" component={Home}></Tab.Screen>
		</Tab.Navigator>
	)
}

export default HomeTabs
