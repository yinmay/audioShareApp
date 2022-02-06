import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, Platform, Dimensions } from 'react-native'
import {
	TabView,
	TabBar,
	NavigationState,
	SceneRendererProps,
} from 'react-native-tab-view'
import Introduction from './Introduction'
import List from './List'

const initialLayout = { width: Dimensions.get('window').width }

interface IRoute {
	key: string
	title: string
}

interface INavigation {
	routes: IRoute[]
	index: number
}

type IState = NavigationState<IRoute>

const routes = [
	{ key: 'introduction', title: 'Introduction' },
	{ key: 'albums', title: 'Albums' },
]

const Tab: FC = () => {
	const [index, setIndex] = useState<number>(1)
	const onIndexChange = (index: number) => {
		setIndex(index)
	}
	const renderScene = ({ route }: { route: IRoute }) => {
		// const { nativeRef, panRef, tapRef, onItemPress, onScrollBeginDrag } =
		// 	props
		switch (route.key) {
			case 'introduction':
				return <Introduction />
			case 'albums':
				return (
					<List
					// nativeRef={nativeRef}
					// panRef={panRef}
					// tapRef={tapRef}
					// onItemPress={onItemPress}
					// onScrollBeginDrag={onScrollBeginDrag}
					/>
				)
		}
	}

	const renderTabBar = (
		props: SceneRendererProps & { navigationState: IState },
	) => (
		<TabBar
			{...props}
			scrollEnabled
			indicatorStyle={styles.indicator}
			style={styles.tabbar}
			labelStyle={styles.label}
			tabStyle={styles.tabStyle}
		/>
	)
	return (
		<TabView
			navigationState={{ routes, index }}
			onIndexChange={onIndexChange}
			renderScene={renderScene}
			renderTabBar={renderTabBar}
			initialLayout={initialLayout}
		/>
	)
}

export default Tab

const styles = StyleSheet.create({
	scene: {
		flex: 1,
	},
	tabbar: {
		backgroundColor: '#fff',

		...Platform.select({
			android: {
				elevation: 0,
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderBottomColor: '#e3e3e3',
			},
		}),
	},
	indicator: {
		backgroundColor: '#e91e63',
	},
	label: {
		// fontWeight: '400',
		color: '#333',
	},
	tabStyle: {
		width: 'auto',
	},
})
