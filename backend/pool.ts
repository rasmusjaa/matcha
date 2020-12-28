import { Pool } from 'pg'
import { DB_PW } from './utils/config'

const createPool = () => {
	return (
		new Pool({
			user: 'user42',
			host: 'localhost',
			database: 'matcha',
			password: DB_PW,
			port: 5432,
			idleTimeoutMillis: 30000,
		})
	)
}

export default createPool
