import React, { FC } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '@/models/index'

const mapStateToProps = ({ album }: RootState) => ({
	data: album,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

const Introduction: FC<ModelState> = props => {
	const { data } = props
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Introduction</Text>
			<Text>{data.introduction}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
	title: {
		fontSize: 18,
		paddingBottom: 10,
	},
})

export default connector(Introduction)
