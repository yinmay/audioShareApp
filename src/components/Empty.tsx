import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

class Empty extends React.PureComponent {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.text}>no data</Text>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		margin: 10,
		alignItems: 'center',
	},
	text: {
		color: '#eee',
	},
})

export default Empty
