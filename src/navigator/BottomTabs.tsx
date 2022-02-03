import React, { FC, useEffect } from 'react'
import { View, Text } from 'react-native'
import {
	NavigationContainer,
	RouteProp,
	TabNavigationState,
} from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Home from '@/pages/Home'
import Listen from '@/pages/Listen'
import Found from '@/pages/Found'
import Account from '@/pages/Account'
import { RootStackNavigation, RootStackParamList } from './index'
import Icon from '@/assets/iconfont/index'
import HomeTabs from './HomeTabs'
export type BottomTabParamList = {
	HomeTabs: undefined
	Listen: undefined
	Found: undefined
	Account: undefined
}

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
	state?: TabNavigationState
}

interface IProps {
	navigation: RootStackNavigation
	route: Route
}

const Tab = createMaterialBottomTabNavigator<BottomTabParamList>()
const BottomTabs: FC<IProps> = props => {
	const setOptions = () => {
		const { navigation, route } = props
		const routeName = route.state
			? route.state.routes[route.state.index].name
			: route.params
			? route.params.screen
			: 'HomeTabs'
		if (routeName === 'HomeTabs') {
			navigation.setOptions({
				headerTitle: '',
				headerTransparent: true,
			})
		} else {
			navigation.setOptions({
				headerTitle: routeName,
				headerTransparent: false,
			})
		}
	}
	useEffect(() => setOptions())
	return (
		// <NavigationContainer>
		<Tab.Navigator
			activeColor="#e91e63"
			barStyle={{ backgroundColor: 'grey' }}
			onPress={() => console.log(123)}>
			<Tab.Screen
				name="Home Tab"
				component={HomeTabs}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Icon name="icon-rnApphome" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Listen"
				component={Listen}
				options={{
					tabBarLabel: 'Listen',
					tabBarIcon: ({ color, size }) => (
						<Icon name="icon-rnAppstar" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Found"
				component={Found}
				options={{
					tabBarLabel: 'Found',
					tabBarIcon: ({ color, size }) => (
						<Icon name="icon-rnAppnew" color={color} size={size} />
					),
				}}
			/>
			<Tab.Screen
				name="Account"
				component={Account}
				options={{
					tabBarLabel: 'Account',
					tabBarIcon: ({ color, size }) => (
						<Icon name="icon-rnAppaccount" color={color} size={size} />
					),
				}}
			/>
		</Tab.Navigator>
		// </NavigationContainer>
	)
}

export default BottomTabs
