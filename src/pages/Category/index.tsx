import React, { FC, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import _ from 'lodash'
import { connect, ConnectedProps } from 'react-redux'
import { DragSortableView } from 'react-native-drag-sort'
import { RootState } from '../../models'
import { RootStackNavigation } from '@/navigator/index'
import { ICategory } from '@/models/category'
import Item, { parentWidth, itemWidth, itemHeight, marginTop } from './Item'
import HeaderRightBtn from './HeaderRightBtn'
import Touchable from '@/components/Touchable'

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

const fixedItems = [0, 1]

const Category: FC<IProps> = props => {
	const [myCategorys, setMyCategorys] = useState<ICategory[]>(props.myCategorys)

	const { categorys, navigation, isEdit, dispatch } = props

	const onSubmit = () => {
		dispatch({
			type: 'category/toggle',
			payload: {
				myCategorys,
			},
		})
		//back to home page
		if (isEdit) {
			navigation.goBack()
		}
	}

	navigation.setOptions({
		headerRight: () => <HeaderRightBtn onPress={onSubmit} />,
	})

	const onLongPress = () => {
		dispatch({
			type: 'category/setState',
			payload: {
				isEdit: true,
			},
		})
	}

	const onPress = (item: ICategory, selected: boolean) => {
		if (isEdit) {
			let newMyCategorys: ICategory[]
			if (selected) {
				newMyCategorys = myCategorys.filter(
					selectedItem => selectedItem.id !== item.id,
				)
			} else {
				newMyCategorys = myCategorys.concat([item])
			}
			setMyCategorys(newMyCategorys)
		}
	}

	const renderItem = (item: ICategory, index: number) => {
		const { isEdit } = props
		const disabled = fixedItems.includes(index)

		return (
			<Item
				key={item.id}
				fixedItems={fixedItems}
				index={index}
				isEdit={isEdit}
				data={item}
				selected
				disabled={disabled}
			/>
		)
	}

	const onClickItem = (data: ICategory[], item: ICategory, index: number) => {
		const fixed = fixedItems.includes(index)
		if (fixed) {
			return
		}
		onPress(item, true)
	}

	const onDataChange = (data: ICategory[]) => {
		setMyCategorys(data)
	}

	const renderUnSelectedItem = (item: ICategory, index: number) => {
		const { isEdit } = props
		return (
			<Touchable
				key={item.id}
				onPress={() => onPress(item, false)}
				onLongPress={onLongPress}>
				<Item
					key={item.id}
					fixedItems={fixedItems}
					index={index}
					isEdit={isEdit}
					data={item}
					selected={false}
					disabled={false}
				/>
			</Touchable>
		)
	}
	const categoryByCassify = _.groupBy(
		categorys,
		(item: ICategory) => item.classify,
	)

	return (
		<ScrollView style={styles.contaner}>
			<View>
				<Text style={styles.classifyName}>
					My Categorys<Text style={styles.tips}>Long press to drag order</Text>
				</Text>
				<View style={styles.classifyView}>
					<DragSortableView
						dataSource={myCategorys}
						parentWidth={parentWidth}
						childrenWidth={itemWidth}
						childrenHeight={itemHeight}
						marginChildrenTop={marginTop}
						fixedItems={fixedItems}
						sortable={isEdit}
						onClickItem={onClickItem}
						onDataChange={onDataChange}
						keyExtractor={item => item.id}
						renderItem={renderItem}
					/>
				</View>
			</View>
			<View>
				{Object.keys(categoryByCassify).map(classify => {
					return (
						<View key={classify}>
							<View>
								<Text style={styles.classifyName}>{classify}</Text>
							</View>
							<View style={styles.classifyView}>
								{categoryByCassify[classify].map((item, index) => {
									if (
										myCategorys.find(
											selectedItem => selectedItem.id === item.id,
										)
									) {
										return null
									}
									return renderUnSelectedItem(item, index)
								})}
							</View>
						</View>
					)
				})}
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
	itemWrapper: {
		width: itemWidth,
	},
	item: {
		height: 40,
		backgroundColor: '#fff',
		margin: 5,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 4,
	},
})
