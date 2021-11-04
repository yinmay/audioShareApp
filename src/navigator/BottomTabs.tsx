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
	const getHeaderTitle = (route: Route): string => {
		const routeName = route.state
			? route.state.routes[route.state.index].name
			: route.params?.screen || '3543'
		return routeName
	}
	console.log(props.route)
	useEffect(() =>
		props.navigation.setOptions({ headerTitle: getHeaderTitle(props.route) }),
	)
	return (
		// <NavigationContainer>
		<Tab.Navigator activeColor="#e91e63" barStyle={{ backgroundColor: 'grey' }}>
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
				options={{ tabBarLabel: 'Listen' }}
			/>
			<Tab.Screen name="Found" component={Found} />
			<Tab.Screen name="Account" component={Account} />
		</Tab.Navigator>
		// </NavigationContainer>
	)
}

export default BottomTabs
