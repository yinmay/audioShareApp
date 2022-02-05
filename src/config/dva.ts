import { create, Model } from 'dva-core-ts'
// import createLoading from 'dva-loading-ts'
import models from '@/models/index'
// import '@/config/http'
import home, { HomeModelType } from '@/models/home'
import { Animated } from 'react-native'

import modelExtend from 'dva-model-extend'

const app = create({
	onError: function (e) {
		console.log('e', e)
	},
})
models.forEach(model => {
	app.model(model)
})

// app.use(createLoading())

app.start()
export default app._store

interface Cached {
	[key: string]: number
}

const cached: Cached = {
	home: 1,
}
function registerModel(model: Model) {
	if (!cached[model.namespace]) {
		app.model(model)
		cached[model.namespace] = 1
	}
}

export const createModel = (namespace: string) => {
	const model: HomeModelType = modelExtend(home, {
		namespace,
		state: {
			scrollValue: new Animated.Value(0),
		},
	})

	registerModel(model)
}
