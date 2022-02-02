import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'redux'
import { CAROUSEL_IMAGES, GUESS_LIST, GUESS_LIST2, CHANNELS } from './data'
import { IGuess, IChannel } from './index'

export interface HomeState {
	// num: number
	carouselImages: string[]
	guessList: IGuess[]
	channels: IChannel[]
}

interface HomeModel extends Model {
	namespace: 'home'
	state?: HomeState
	reducers?: {
		getCarouselImages: Reducer<HomeState>
		getGuessList: Reducer<HomeState>
		getAnotherGuessList: Reducer<HomeState>
		getChannels: Reducer<HomeState>
		// fetchCarouselList: Reducer<HomeState>
	}
	effects: {
		asyncAdd: Effect
	}
	//ReducersMapObject | ReducersMapObjectWithEnhancer
	// effects?: EffectsMapObject
	// subscriptions?: SubscriptionsMapObject
}

const initialState = {
	carouselImages: [],
	guessList: [],
	channels: [],
}

function delay(time: number) {
	return new Promise(resolve => {
		return setTimeout(resolve, time)
	})
}

const homeModel: HomeModel = {
	namespace: 'home',
	state: initialState,
	reducers: {
		getCarouselImages(state = initialState) {
			return {
				...state,
				carouselImages: [...CAROUSEL_IMAGES],
			}
		},
		getGuessList(state = initialState) {
			return {
				...state,
				guessList: [...GUESS_LIST],
			}
		},
		getAnotherGuessList(state = initialState) {
			return {
				...state,
				guessList: [...state.guessList, ...GUESS_LIST2],
			}
		},
		getChannels(state = initialState) {
			return {
				...state,
				channels: CHANNELS,
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
