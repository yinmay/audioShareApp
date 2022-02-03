import { Dimensions } from 'react-native'
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
	while (route.state) {
		route = route.state.routes[route.state.index]
	}
	return route.name
}

export {
	viewportWidth,
	viewportHeight,
	wp,
	hp,
	findRouteNameFromNavigatorState,
}
