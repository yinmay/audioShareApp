import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'redux'
import { data } from './data'

export interface HomeState {
	num: number
	carouselData: string[]
}

interface HomeModel extends Model {
	namespace: 'home'
	state?: HomeState
	reducers?: {
		add: Reducer<HomeState>
	}
	effects: {
		asyncAdd: Effect
	}
	//ReducersMapObject | ReducersMapObjectWithEnhancer
	// effects?: EffectsMapObject
	// subscriptions?: SubscriptionsMapObject
}

const initialState = { num: 0, carouselData: [] }

function delay(time: number) {
	return new Promise(resolve => {
		return setTimeout(resolve, time)
	})
}

const homeModel: HomeModel = {
	namespace: 'home',
	state: initialState,
	reducers: {
		add(state = initialState) {
			return {
				...state,
				carouselData: [...data],
			}
		},
	},
	effects: {
		*asyncAdd({ payload }, { call, put }) {
			yield call(delay, 300)
			yield put({ type: 'add', payload })
		},
	},
}

export default homeModel
