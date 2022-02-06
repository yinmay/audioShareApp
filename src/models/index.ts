import home from './home'
import category from './category'
import album from './album'
import { DvaLoadingState } from 'dva-loading-ts'

const models = [home, category, album]

export interface IGuess {
	title: string
	image: string
	id: string
}

export type RootState = {
	home: typeof home.state //HomeState
	category: typeof category.state //HomeState
	loading: DvaLoadingState
} & {
	[key: string]: typeof home.state
}

export interface IChannel {
	id: string
	title: string
	image: string
	remark: string
	played: number
	playing: number
}

export interface iCarouselImage {
	image: string
	colors: string[]
}

export interface IInfo {
	page: number
	result: number
}

// declare const enum ACT {
// 	setState = 'SAY_HELLO',
// 	INC_BY = 'INC_BY',
// }

// type IActionPayloadMapping = {
// 	[ACT.SAY_HELLO]: { msg: string }
// 	[ACT.INC_BY]: { count: number }
// }

// type IActionPayload<T> = T extends keyof IActionPayloadMapping
// 	? IActionPayloadMapping[T]
// 	: any

// type IAction = {
// 	[key in keyof typeof ACT]: {
// 		type: typeof ACT[key]
// 		payload?: IActionPayload<typeof ACT[key]>
// 	}
// }[keyof typeof ACT]

export default models
