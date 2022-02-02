import home from './home'
import { DvaLoadingState } from 'dva-loading-ts'

const models = [home]

export interface GuessItem {
	title: string
	image: string
	id: string
}

export type RootState = {
	home: typeof home.state //HomeState
	loading: DvaLoadingState
	carouselImages: string[]
	guessList: GuessItem[]
}

export default models
