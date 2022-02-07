import React from 'react'
import { Provider } from 'react-redux'
import Navigator from '@/navigator/index'
import store from '@/config/dva'
import { StatusBar } from 'react-native'

export default class extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<Navigator />
				<StatusBar
					hidden={false}
					backgroundColor="rgba(0, 0, 0, 0)"
					// backgroundColor="transparent"
					barStyle="dark-content"
					translucent
					animated={true}
					showHideTransition={'fade'}
					networkActivityIndicatorVisible={true}
				/>
			</Provider>
		)
	}
}
