import React, { FC } from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'

import TopTabBarWrapper from '@/pages/views/TopTabBarWrapper'
import { RootState } from '@/models/index'
import { createModel } from '@/config/dva'

import {
	createMaterialTopTabNavigator,
	MaterialTopTabNavigationProp,
} from '@react-navigation/material-top-tabs'
import Home from '@/pages/Home'

export type HomeTabParamList = {
	[key: string]: {
		modelNamespace: string
		category: string
	}
}

export type HomeTabNavigation = MaterialTopTabNavigationProp<HomeTabParamList>
const Tab = createMaterialTopTabNavigator()

const mapStateToProps = ({ category }: RootState) => {
	return {
		myCategorys: category.myCategorys,
	}
}

const connector = connect(mapStateToProps)

type IProps = ConnectedProps<typeof connector>

const HomeTabs: FC<IProps> = props => {
	return (
		<Tab.Navigator
			tabBar={props => <TopTabBarWrapper {...props} />}
			lazy
			sceneContainerStyle={styles.sceneContainer}
			tabBarOptions={{
				scrollEnabled: true,
				tabStyle: {
					padding: 0,
					width: 100,
				},
				labelStyle: {
					color: '#e91e63',
				},

				style: {
					backgroundColor: 'transparent',
					color: '#e91e63',
				},
				indicatorStyle: {
					height: 4,
					backgroundColor: '#e91e63',
				},
				activeTintColor: '#fff',
				inactiveTintColor: '#fff',
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
			{props.myCategorys.map(category => {
				createModel('tab-' + category.id)
				return (
					<Tab.Screen
						key={category.id}
						name={'tab-' + category.id}
						component={Home}
						options={{
							tabBarLabel: category.name,
						}}
						initialParams={{
							modelNamespace: 'tab-' + category.id,
							category: category.id,
						}}
					/>
				)
			})}
		</Tab.Navigator>
	)
}

export default connector(HomeTabs)

const styles = StyleSheet.create({
	sceneContainer: {
		backgroundColor: 'transparent',
	},
})
