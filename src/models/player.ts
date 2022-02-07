import axios from 'axios'
import { Effect, EffectWithType, Model } from 'dva-core-ts'
import { Reducer } from 'redux'
import { RootState } from '.'
import {
	sound,
	initPlayer,
	playComplete,
	stop,
	getCurrentTime,
} from '@/config/sound'
import realm from '@/config/realm'

import { REQUEST_URL } from './data'
import { IAlbum, AlbumModelState } from './album'

const DETAIL_URL = `${REQUEST_URL}/api/detail`

export interface PlayerModelState {
	id: number
	soundUrl: string
	currentAlbum: AlbumModelState | {}
	duration: number
	playSeconds: number
	playState: '' | 'playing' | 'paused' | 'finish'
}

export interface PlayerModelType extends Model {
	namespace: 'player'
	state: PlayerModelState
	reducers: {
		setState: Reducer<PlayerModelState>
		// setShow: Reducer<PlayerModelState>
	}
	effects: {
		fetchDetail: Effect
		play: Effect
		pause: Effect
	}
}

const initialState: PlayerModelState = {
	id: 0,
	soundUrl: '',
	currentAlbum: {},
	playSeconds: 0,
	duration: 0,
	playState: '',
}

const PlayerModel: PlayerModelType = {
	namespace: 'player',
	state: initialState,
	reducers: {
		setState(state, { payload }) {
			const newState = {
				...state,
				...payload,
			}
			const percent = (newState.playSeconds / newState.duration) * 100
			newState.percent = percent
			return newState
		},
	},
	effects: {
		*fetchDetail(payload, { call, put, select }) {
			yield put({
				type: 'setState',
				payload: {
					playState: 'paused',
				},
			})
			const { id, soundUrl } = yield select(({ player }: RootState) => player)

			const {
				data: { data },
			} = yield call(
				axios.get,
				DETAIL_URL,
				// {
				// params: { id: payload.id }, // fake data
				// }
			)
			yield put({
				type: 'setState',
				payload: {
					...data,
				},
			})
			console.log(data)
			yield call(initPlayer, data.soundUrl)
			yield put({
				type: 'player/play',
			})
		},
		*play(_, { call, put, select }) {
			yield put({
				type: 'setState',
				payload: {
					playState: 'playing',
					duration: sound.getDuration(),
				},
			})

			yield call(playComplete)
			yield put({
				type: 'setState',
				payload: {
					playState: 'paused',
					duration: sound.getDuration(),
				},
			})
		},
		*pause(_, { put, select }) {
			if (sound) {
				sound.pause()
			}
			const { id, soundUrl, playSeconds } = yield select(
				({ player }: RootState) => player,
			)

			// realm.write(() => {
			// 	realm.create('Show', { id, soundUrl, playSeconds }, true)
			// })
			yield put({
				type: 'setState',
				payload: {
					playState: 'paused',
				},
			})
			yield put({
				type: 'setState',
				payload: {
					playState: 'paused',
					duration: sound.getDuration(),
				},
			})
		},
		*changeCurrentTime(_, { put, select }) {
			if (sound) {
				const { playSeconds } = yield select(({ player }: RootState) => player)

				sound.setCurrentTime(playSeconds)
			}
			yield put({
				type: 'player/timer-start',
			})
		},
	},
}

export default PlayerModel
