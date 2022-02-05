import { Model, Effect, SubscriptionsMapObject } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import storage, { load } from '@/config/storage'
import { RootState } from '.'

import { REQUEST_URL } from './data'

const CATEGORY_URL = `${REQUEST_URL}/api/category`

export interface ICategory {
	id: string
	name: string
	classify?: string
}

export interface CategoryModelState {
	isEdit: boolean
	categorys: ICategory[]
	myCategorys: ICategory[]
}

export interface CategoryModelType extends Model {
	namespace: 'category'
	state: CategoryModelState
	effects: {
		toggle: Effect
		loadData: Effect
	}
	reducers: {
		setState: Reducer<CategoryModelState>
	}
	subscriptions: SubscriptionsMapObject
}

const initialState: CategoryModelState = {
	isEdit: false,
	categorys: [],
	myCategorys: [
		{
			id: 'home',
			name: 'recommand',
		},
		{
			id: 'vip',
			name: 'Vip',
		},
	],
}

const Category: CategoryModelType = {
	namespace: 'category',
	state: initialState,
	reducers: {
		setState(state = initialState, { payload }) {
			return {
				...state,
				...payload,
			}
		},
	},
	effects: {
		*loadData(_, { call, put }) {
			const categorys: ICategory[] = yield call(load, {
				key: 'categorys',
			})

			const myCategorys: ICategory[] = yield call(load, {
				key: 'myCategorys',
			})
			let payload
			if (myCategorys) {
				payload = {
					myCategorys,
					categorys,
					isEdit: false,
				}
			} else {
				payload = {
					categorys,
					isEdit: false,
				}
			}
			yield put({
				type: 'setState',
				payload,
			})
		},
		*toggle({ payload }, { put, select }) {
			const category: CategoryModelState = yield select(
				(state: RootState) => state.category,
			)

			yield put({
				type: 'setState',
				payload: {
					isEdit: !category.isEdit,
					myCategorys: payload.myCategorys,
				},
			})
			if (category.isEdit) {
				storage.save({
					key: 'myCategorys',
					data: payload.myCategorys,
				})
			}
		},
	},
	subscriptions: {
		//dva will call all the functions in subscription after load all the data
		setup({ dispatch }) {
			dispatch({ type: 'loadData' })
		},
		asyncStorage() {
			storage.sync.categorys = async () => {
				const {
					data: { data },
				} = await axios.get(CATEGORY_URL)
				return data
			}
			storage.sync.myCategorys = async () => {
				return null
			}
		},
	},
}

export default Category
