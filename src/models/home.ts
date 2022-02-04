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
	hasMore: boolean
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
		pageSize: 8,
	},
	hasMore: true,
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
			const {
				info,
				channels: list,
				hasMore,
			} = yield select((state: RootState) => state.home)
			const { loadMore = false, refreshing = false } = payload

			yield put({
				type: 'setState',
				payload: {
					refreshing,
				},
			})

			const {
				data: { data, count },
			} = yield call(axios.get, CHANNEL_URL, {
				params: { page: info.page },
			})

			if (count <= list.length) {
				return yield put({
					type: 'setState',
					payload: {
						hasMore: false,
					},
				})
			}

			let newList = []
			if (loadMore) {
				newList = list.concat(data)
			} else {
				newList = data
			}

			yield put({
				type: 'setState',
				payload: {
					channels: newList,
					refreshing: false,
				},
			})
		},
	},
}
export default homeModel
