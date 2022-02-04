import home from './home'
import { DvaLoadingState } from 'dva-loading-ts'

const models = [home]

export interface IGuess {
	title: string
	image: string
	id: string
}

export type RootState = {
	home: typeof home.state //HomeState
	loading: DvaLoadingState
	carouselImages: string[]
	guessList: IGuess[]
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
export default models
