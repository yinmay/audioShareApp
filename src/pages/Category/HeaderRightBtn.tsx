import React, { FC } from 'react'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { RootState } from '@/models/index'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = ({ category }: RootState) => ({
	isEdit: category.isEdit,
})

const connector = connect(mapStateToProps)

interface IProps extends ConnectedProps<typeof connector> {
	onPress: () => void
}

const HeaderRightBtn: FC<IProps> = props => {
	const onPress = () => {
		const { onPress } = props
		if (typeof onPress === 'function') {
			onPress()
		}
	}
	const { isEdit } = props
	return (
		<HeaderButtons>
			<Item
				title={isEdit ? 'Complete' : 'Edit'}
				color="#e91e63"
				onPress={onPress}
			/>
		</HeaderButtons>
	)
}

export default connector(HeaderRightBtn)
