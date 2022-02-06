import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'redux'
import axios from 'axios'
import { REQUEST_URL } from './data'

const ALBUM_URL = `${REQUEST_URL}/api/album`

export interface IAlbum {
	id: string
	title: string
	playVolume: number
	duration: number
	date: string
}

export interface IAuthor {
	id: string
	name: string
	// attention: string
	// avatar: string
}

export interface AlbumModelState {
	list: IAlbum[]
	author: IAuthor
	id: string
	title: string
	summary: string
	// thumbnailUrl: string
	introduction: string
}

export interface AlbumModelType extends Model {
	namespace: 'album'
	state: AlbumModelState
	effects: {
		fetchList: Effect
	}
	reducers: {
		setState: Reducer<AlbumModelState>
	}
}

const initialState: AlbumModelState = {
	id: '',
	// thumbnailUrl: '',
	title: '',
	summary: '',
	introduction: '',
	list: [],
	author: {
		id: '',
		name: '',
		// attention: '',
		// avatar: '',
	},
}

const AlbumModel: AlbumModelType = {
	namespace: 'album',
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
		*fetchList(_, { call, put }) {
			const {
				data: { data },
			} = yield call(axios.get, ALBUM_URL)

			console.log(data)
			yield put({
				type: 'setState',
				payload: data,
			})
		},
	},
}

export default AlbumModel
