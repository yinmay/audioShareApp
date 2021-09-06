import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'redux'

export interface HomeState {
	num: number
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

const initialState = { num: 0 }

function delay(time: number) {
	return new Promise(resolve => {
		return setTimeout(resolve, time)
	})
}

const homeModel: HomeModel = {
	namespace: 'home',
	state: initialState,
	reducers: {
		add(state = initialState, { payload }) {
			return {
				...state,
				num: state?.num + payload.num,
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
