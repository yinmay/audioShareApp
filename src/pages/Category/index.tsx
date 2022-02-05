import React, { FC, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../models'
import { RootStackNavigation } from '@/navigator/index'
import { ICategory } from '@/models/category'
import { viewportWidth } from '@/utils/index'

const mapStateToProps = ({ category }: RootState) => ({
	isEdit: category.isEdit,
	categorys: category.categorys,
	myCategorys: category.myCategorys,
})

const connector = connect(mapStateToProps)

type ModelState = ConnectedProps<typeof connector>

interface IProps extends ModelState {
	navigation: RootStackNavigation
}

export interface IState {
	myCategorys: ICategory[]
}

const parentWidth = viewportWidth - 10
const itemWidth = parentWidth / 4

const Category: FC<IProps> = props => {
	const [myCategorys, setMyCategorys] = useState<ICategory[]>(props.myCategorys)

	const { categorys } = props

	const renderItem = (item: ICategory, index: number) => {
		const { isEdit } = props
		// const disabled = fixedItems.includes(index)
		return (
			<View
				key={item.id}
				style={{
					width: itemWidth,
				}}>
				<View
					style={{
						height: 40,
						backgroundColor: '#fff',
						margin: 5,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
					<Text>{item.name}</Text>
				</View>
			</View>
		)
	}
	return (
		<ScrollView style={styles.contaner}>
			<View>
				<Text style={styles.classifyName}>
					My Categorys<Text style={styles.tips}>Long press to drag order</Text>
				</Text>
				<View style={styles.classifyView}>{myCategorys.map(renderItem)}</View>
			</View>
			<View>
				<View>
					<Text>All Categorys</Text>
				</View>
				<View style={styles.classifyView}>{categorys.map(renderItem)}</View>
			</View>
		</ScrollView>
	)
}

export default connector(Category)

const styles = StyleSheet.create({
	contaner: {
		flex: 1,
		backgroundColor: '#f3f6f6',
	},
	classifyName: {
		fontSize: 16,
		marginBottom: 8,
		marginTop: 14,
		marginLeft: 10,
	},
	tips: {
		color: '#999999',
		fontSize: 16,
		paddingLeft: 12,
	},
	classifyView: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		padding: 5,
	},
})
