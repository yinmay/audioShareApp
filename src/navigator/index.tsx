import React from 'react'
import {
	View,
	Text,
	PlatformColor,
	StyleSheet,
	Platform,
	StatusBar,
	Animated,
} from 'react-native'
import { NavigationContainer, RouteProp } from '@react-navigation/native'
import {
	createStackNavigator,
	StackNavigationProp,
	HeaderStyleInterpolators,
	CardStyleInterpolators,
	TransitionPresets,
} from '@react-navigation/stack'

import BottomTabs from './BottomTabs'
import Detail from '@/pages/Detail'
import Category from '@/pages/Category'
import Album from '@/pages/Album'
import { create } from 'lodash'
import {
	statusBarHeight,
	navigationRef,
	findRouteNameFromNavigatorState,
} from '@/utils/index'
export type ModalStackParamList = {
	Root: undefined
	Detail: {
		id?: string
	}
}

const ModalStack = createStackNavigator<ModalStackParamList>()

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>

const ModalStackScreen = () => {
	return (
		<ModalStack.Navigator
			mode="modal"
			headerMode="screen"
			screenOptions={() => ({
				...TransitionPresets.ModalSlideFromBottomIOS,
				// cardOverlayEnabled: true,
				gestureEnabled: true,
				headerTitleAlign: 'center',
				// headerStatusBarHeight: statusBarHeight,
				headerBackTitleVisible: false,
			})}>
			<ModalStack.Screen
				name="Root"
				component={RootStackScreen}
				options={{ headerShown: false }}
			/>
			<ModalStack.Screen
				name="Detail"
				component={Detail}
				options={{
					headerTransparent: true,
					headerTitle: '',
					cardStyle: { backgroundColor: '#807c66' },
					headerTintColor: '#fff',
				}}
			/>
		</ModalStack.Navigator>
	)
}

export type RootStackParamList = {
	BottomTabs: {
		screen?: string
	}
	Category: undefined
	Album: {
		item: {
			id: string
			title: string
			image: string
		}
	}
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>

const RootStack = createStackNavigator<RootStackParamList>()

const RootStackScreen = () => {
	const getAlbumOptions = ({
		route,
	}: {
		route: RouteProp<RootStackParamList, 'Album'>
	}) => {
		return {
			headerTransparent: true,
			headerTitleStyle: {
				opacity: route.params?.opacity || 0,
			},
			headerTitle: route.params.item.title,
			headerBackground: () => (
				<Animated.View
					style={StyleSheet.flatten([
						styles.headerBackground,
						{
							// opacity: route.params?.opacity,
						},
					])}
				/>
			),
		}
	}
	return (
		<RootStack.Navigator
			screenOptions={{
				headerMode: 'screen',
				headerTitleAlign: 'center',
				headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
				cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
				gestureEnabled: true,
				gestureDirection: 'horizontal',
				headerBackTitleVisible: false,
				headerTintColor: '#e91e63',
				...Platform.select({
					android: {
						headerStatusBarHeight: StatusBar.currentHeight,
					},
				}),
				headerStyle: {
					...Platform.select({
						android: {
							elevation: 0,
							borderBottomWidth: StyleSheet.hairlineWidth,
						},
					}),
				},
				headerMode: 'float',
			}}>
			<RootStack.Screen
				name="BottomTabs"
				component={BottomTabs}
				options={{
					headerTitle: 'Home',
				}}
			/>
			<RootStack.Screen
				name="Category"
				component={Category}
				options={{ headerTitle: 'Category' }}
			/>
			<RootStack.Screen
				name="Album"
				component={Album}
				options={getAlbumOptions}
			/>
		</RootStack.Navigator>
	)
}

const styles = StyleSheet.create({
	headerBackground: {
		flex: 1,
		backgroundColor: 'transparent',
	},
})

const Navigator = () => {
	return (
		<NavigationContainer>
			<ModalStackScreen />
		</NavigationContainer>
	)
}

export default Navigator
