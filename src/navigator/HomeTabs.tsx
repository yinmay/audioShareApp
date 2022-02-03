import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper'
import {
	MaterialTopTabBarProps,
	MaterialTopTabBar,
} from '@react-navigation/material-top-tabs'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Home from '@/pages/Home'
const Tab = createMaterialTopTabNavigator()

const HomeTabs = props => {
	return (
		<Tab.Navigator
			tabBar={props => <TopTabBarWrapper {...props} />}
			lazy
			sceneContainerStyle={styles.sceneContainer}
			tabBarOptions={{
				scrollEnabled: true,
				tabStyle: {
					padding: 0,
					width: 80,
				},
				indicatorStyle: {
					height: 4,
					width: 20,
					marginLeft: 30,
					borderRadius: 2,
					backgroundColor: 'transparent',
				},
				// activeTintColor: '#fff',
				// inactiveTintColor: '#fff',
			}}
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
				options={{ tabBarLabel: 'Recommand' }}></Tab.Screen>
			{/* <Tab.Screen name="Home2" component={Home}></Tab.Screen> */}
		</Tab.Navigator>
	)
}

export default HomeTabs

const styles = StyleSheet.create({
	sceneContainer: {
		backgroundColor: 'transparent',
	},
})
