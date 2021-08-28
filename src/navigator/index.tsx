import React from 'react'
import { View, Text, PlatformColor, StyleSheet, Platform } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
	createStackNavigator,
	StackNavigationProp,
	HeaderStyleInterpolators,
	CardStyleInterpolators,
} from '@react-navigation/stack'
import BottomTabs from './BottomTabs'
import Detail from '@/pages/detail'

export type RootStackParamList = {
	BottomTabs: undefined
	Detail: { id: number }
}

export type RootStackNavigation = StackNavigationProp

const Stack = createStackNavigator<RootStackParamList>()

const Navigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerTitleAlign: 'center',
					headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
					cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
					gestureEnabled: true,
					gestureDirection: 'horizontal',
					headerStyle: {
						...Platform.select({
							android: {
								elevation: 0,
								borderBottomWidth: StyleSheet.hairlineWidth,
							},
						}),
					},
				}}
				headerMode="float">
				<Stack.Screen name="BottomTabs" component={BottomTabs} />
				<Stack.Screen name="Detail" component={Detail} />
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigator
