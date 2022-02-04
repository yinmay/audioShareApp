import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper'

import {
	createMaterialTopTabNavigator,
	MaterialTopTabBarProps,
	MaterialTopTabBar,
} from '@react-navigation/material-top-tabs'
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
					width: 120,
				},
				labelStyle: {
					color: '#e91e63',
				},

				style: {
					backgroundColor: 'transparent',
					color: '#e91e63',
				},
				indicatorStyle: {
					height: 0,
				},
				// activeTintColor: '#fff',
				// inactiveTintColor: '#fff',
			}}
			// screenOptions={{
			// 	lazy: true,
			// 	tabBarScrollEnabled: true,
			// 	tabBarActiveTintColor: '#e91e63',
			// 	headerStatusBarHeight: StatusBar.currentHeight,
			// 	tabBarItemStyle: {
			// 		width: 120,
			// 		// backgroundColor: 'transparent',
			// 	},
			// }}
		>
			<Tab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: 'Recommand',
					navBarTransparent: true,
					navBarTranslucent: true,
				}}></Tab.Screen>
		</Tab.Navigator>
	)
}

export default HomeTabs

const styles = StyleSheet.create({
	sceneContainer: {
		backgroundColor: 'transparent',
	},
})
