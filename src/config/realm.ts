import Realm from 'realm'

class Show {
	static schema = {
		name: 'Show',
		primaryKey: 'id',
		properties: {
			id: 'string',
			title: 'string',
			thumbnailUrl: 'string',
			playSeconds: { type: 'double', default: 0 },
			duration: { type: 'double', default: 0 },
		},
	}
}

const realm = new Realm({ schema: [Show], schemaVersion: 1 })

export default realm
