import { Dimensions, StatusBar } from 'react-native'
import { NavigationState } from '@react-navigation/native'

const { width: viewportWidth, height: viewportHeight } =
	Dimensions.get('window')

// get width according to percentage
function wp(percentage: number) {
	const value = (percentage * viewportWidth) / 100
	return Math.round(value)
}
function hp(percentage: number) {
	const value = (percentage * viewportHeight) / 100
	return Math.round(value)
}

function findRouteNameFromNavigatorState({ routes, index }: NavigationState) {
	let route = routes[index]
	while (route.state && route.state.index) {
		route = route.state.routes[route.state.index]
	}
	return route.name
}
const statusBarHeight = StatusBar.currentHeight

function getTimeString(seconds: number) {
	const m = parseInt((seconds % (60 * 60)) / 60 + '', 10)
	const s = parseInt((seconds % 60) + '', 10)

	return (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s)
}

export {
	statusBarHeight,
	viewportWidth,
	viewportHeight,
	wp,
	hp,
	findRouteNameFromNavigatorState,
	getTimeString,
}
