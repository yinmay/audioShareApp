import Storage, { LoadParams } from 'react-native-storage'
import AsyncStorage from '@react-native-community/async-storage'

const storage = new Storage({
	size: 1000,
	//rn=>AsyncStorage web=>window.localstorage, restart will lost data

	storageBackend: AsyncStorage,

	defaultExpires: 1000 * 3600 * 24 * 7, //7 days, null is never expired

	enableCache: true,
	sync: {
		async user() {
			return null
		},
	},
})

// 读取
const load = (params: LoadParams) => {
	return new Promise((resolve, reject) => {
		storage
			.load(params)
			.then(ret => {
				resolve(ret)
			})
			.catch(err => {
				console.log(err)
				reject(err)
			})
	})
}

export { load }

export default storage
