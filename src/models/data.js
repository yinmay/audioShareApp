import { Random } from 'mockjs'

export const GUESS_LIST = [
	{
		title: Random.string('lower', 50),
		image: 'https://dummyimage.com/80x80/000/fff',
		id: 1,
	},
	{
		title: Random.string('lower', 50),
		image: 'https://dummyimage.com/80x80/000/fff',
		id: 2,
	},
	{
		title: Random.string('lower', 50),
		image: 'https://dummyimage.com/80x80/000/fff',
		id: 3,
	},
]

export const GUESS_LIST2 = [
	{
		title: Random.string('lower', 50),
		image: 'https://dummyimage.com/80x80/666/fff',
		id: 1,
	},
	{
		title: Random.string('lower', 50),
		image: 'https://dummyimage.com/80x80/666/fff',
		id: 2,
	},
	{
		title: Random.string('lower', 50),
		image: 'https://dummyimage.com/80x80/666/fff',
		id: 3,
	},
]

export const CAROUSEL_IMAGES = [
	'https://dummyimage.com/400x200/000/fff',
	'https://dummyimage.com/400x200/green/fff',
]

export const CHANNELS = [
	{
		id: 1,
		title: Random.string('lower', 5),
		remark: Random.string('lower', 50),
		played: 200,
		playing: 20,
		image: 'https://dummyimage.com/80x80/666/fff',
	},
]
