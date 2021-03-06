import React, { FC } from 'react'
import { View, Text, StyleSheet, Platform, NativeModules } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import Touchable from '@/components/Touchable'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'
import { findRouteNameFromNavigatorState } from '@/utils/index'
import LinearAnimatedGradientTransition from 'react-native-linear-animated-gradient-transition'
import {
	MaterialTopTabBarProps,
	MaterialTopTabBar,
} from '@react-navigation/material-top-tabs'

const { StatusBarManager } = NativeModules

const mapStateToProps = (state: RootState, props: MaterialTopTabBarProps) => {
	const activeRouteName = findRouteNameFromNavigatorState(props.state)
	const modelState = state[activeRouteName]
	return {
		activeColor:
			modelState?.carouselImages && modelState?.carouselImages.length > 0
				? modelState?.carouselImages[modelState?.activeCarouselIndex]?.colors
				: undefined,
		gradientVisible: modelState?.gradientVisible,
		modelNamespace: activeRouteName,
	}
}

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

type IProps = MaterialTopTabBarProps & ModelState

/**
 * custom navigation header
 */
const TopTabBarWrapper: FC<IProps> = props => {
	const goCategory = () => {
		const { navigation } = props
		navigation.navigate('Category')
	}

	const goHistory = () => {
		const { navigation } = props
		navigation.navigate('History')
	}

	const gradient = () => {
		return props.gradientVisible ? (
			<LinearAnimatedGradientTransition
				colors={props.activeColor}
				style={styles.gradient}></LinearAnimatedGradientTransition>
		) : null
	}

	let {
		gradientVisible,
		activeTintColor,
		inactiveTintColor,
		indicatorStyle,
		...rest
	} = props
	let textStyle = styles.text
	if (!gradientVisible) {
		textStyle = styles.blackText
		activeTintColor = '#000'
		inactiveTintColor = '#333'
		if (indicatorStyle) {
			indicatorStyle = StyleSheet.compose(
				indicatorStyle,
				styles.grayBackgroundColor,
			)
		}
	} else {
		indicatorStyle = StyleSheet.compose(
			indicatorStyle,
			styles.whiteBackgroundColor,
		)
	}
	const whiteText = { color: gradientVisible ? '#fff' : '#333' }

	return (
		<View style={styles.container}>
			{gradient()}
			<View style={styles.topTabBarView}>
				<MaterialTopTabBar
					{...rest}
					indicatorStyle={indicatorStyle}
					activeTintColor={activeTintColor}
					inactiveTintColor={inactiveTintColor}
					style={styles.tabbar}
				/>

				<Touchable onPress={goCategory} style={styles.sortBtn}>
					<Text style={whiteText}>Category</Text>
				</Touchable>
			</View>

			<View style={styles.searchBar}>
				<Touchable style={styles.search}>
					<Text style={whiteText}>search</Text>
				</Touchable>
				<Touchable style={styles.history} onPress={goHistory}>
					<Text style={whiteText}>history</Text>
				</Touchable>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingTop: getStatusBarHeight(),
	},
	gradient: {
		...StyleSheet.absoluteFillObject,
		height: 460,
	},
	topTabBarView: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	tabbar: {
		flex: 1,
		overflow: 'hidden',
		backgroundColor: 'transparent',
	},
	searchBar: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 7,
		paddingHorizontal: 15,
	},
	search: {
		flex: 1,
		justifyContent: 'center',
		paddingLeft: 12,
		height: 30,
		borderRadius: 15,
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
	},
	history: {
		marginLeft: 24,
	},
	sortBtn: {
		paddingHorizontal: 8,
		borderLeftColor: '#eee',
		borderLeftWidth: StyleSheet.hairlineWidth,
	},
	text: {
		color: '#fff',
	},
	blackText: {
		color: '#333',
	},
	grayBackgroundColor: {
		backgroundColor: '#333',
	},
	whiteBackgroundColor: {
		backgroundColor: '#fff',
	},
	linearGradient: {
		flex: 1,
		paddingLeft: 15,
		paddingRight: 15,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 18,
		fontFamily: 'Gill Sans',
		textAlign: 'center',
		margin: 10,
		color: '#ffffff',
		backgroundColor: 'transparent',
	},
})

export default connector(TopTabBarWrapper)
