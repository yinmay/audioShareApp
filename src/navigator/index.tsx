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
} from '@react-navigation/stack'

import BottomTabs from './BottomTabs'
import Detail from '@/pages/detail'
import Category from '@/pages/Category'
import Album from '@/pages/Album'

export type ModalStackParamList = {
	Root: undefined
	ProgramDetail: {
		id?: string
		previousId?: string
		nextId?: string
	}
	Login: undefined
}

export type ModalStackNavigation = StackNavigationProp<ModalStackParamList>

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

const Stack = createStackNavigator<RootStackParamList>()

const styles = StyleSheet.create({
	headerBackground: {
		flex: 1,
		backgroundColor: '#fff',
	},
})

const Navigator = () => {
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
							// opacity: route.params.opacity,
						},
					])}
				/>
			),
		}
	}
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
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
				<Stack.Screen
					name="BottomTabs"
					component={BottomTabs}
					options={{ headerTitle: 'Home' }}
				/>
				<Stack.Screen
					name="Category"
					component={Category}
					options={{ headerTitle: 'Category' }}
				/>
				<Stack.Screen
					name="Album"
					component={Album}
					options={getAlbumOptions}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}

export default Navigator
