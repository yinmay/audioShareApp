import axios from 'axios'
import { Model, Effect } from 'dva-core-ts'

import { Reducer } from 'redux'
import { IGuess, IChannel, iCarouselImage, IInfo, RootState } from './index'

const REQUEST_URL =
	'https://www.fastmock.site/mock/0a1e1812d969fae03fa14074df4989a6/mock'

const CAROUSEL_URL = `${REQUEST_URL}/api/carousel`
const GUESS_URL = `${REQUEST_URL}/api/guess`
const CHANNEL_URL = `${REQUEST_URL}/api/channel`

export interface HomeState {
	activeCarouselIndex: number
	gradientVisible: boolean
	carouselImages: iCarouselImage[]
	guessList: IGuess[]
	channels: IChannel[]
	info: IInfo
	refreshing: boolean
}

interface HomeModel extends Model {
	namespace: 'home'
	state?: HomeState
	reducers?: {
		setState: Reducer<HomeState>
	}
	effects: {
		asyncAdd: Effect
		fetchCarouselImages: Effect
		fetchGuessList: Effect
		fetchChannelList: Effect
	}
}

const initialState = {
	carouselImages: [],
	guessList: [],
	channels: [],
	activeCarouselIndex: 0,
	gradientVisible: true,
	refreshing: false,
	info: {
		page: 1,
		result: 3,
	},
}

const homeModel: HomeModel = {
	namespace: 'home',
	state: initialState,
	reducers: {
		setState(state, { payload }) {
			return {
				...state,
				...payload,
			}
		},
	},
	effects: {
		*fetchCarouselImages(_, { call, put }) {
			const {
				data: { list },
			} = yield call(axios.get, CAROUSEL_URL)
			yield put({
				type: 'setState',
				payload: {
					carouselImages: list,
				},
			})
		},
		*fetchGuessList(_, { call, put }) {
			const {
				data: { data },
			} = yield call(axios.get, GUESS_URL)

			yield put({
				type: 'setState',
				payload: {
					guessList: data,
				},
			})
		},

		*fetchChannelList({ type, payload }, { call, put, select }) {
			const { info, channels: list } = yield select(
				(state: RootState) => state.home,
			)
			const { refreshing } = payload

			yield put({
				type: 'setState',
				payload: {
					refreshing,
				},
			})

			const page = refreshing ? 0 : info.page
			const {
				data: { data },
			} = yield call(axios.get, CHANNEL_URL, {
				params: { page },
			})
			const newList = refreshing ? data : list.concat(data)
			yield put({
				type: 'setState',
				payload: {
					channels: newList,
				},
			})
		},
	},
}
export default homeModel
