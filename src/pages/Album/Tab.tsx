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
import { IAlbum } from '@/models/album'

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

interface IProps {
	onItemPress: (item: IAlbum, index: number) => void
}

const Tab: FC<IProps> = props => {
	const [index, setIndex] = useState<number>(1)
	const onIndexChange = (index: number) => {
		setIndex(index)
	}
	const renderScene = ({ route }: { route: IRoute }) => {
		const { onItemPress } = props
		switch (route.key) {
			case 'introduction':
				return <Introduction />
			case 'albums':
				return <List onItemPress={onItemPress} />
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
