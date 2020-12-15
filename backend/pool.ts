import { Pool } from 'pg'

const createPool = () => {
	return (
		new Pool({
			user: 'user42',
			host: 'localhost',
			database: 'matcha',
			password: 'user42',
			port: 5432,
			idleTimeoutMillis: 30000,
		})
	)
}

export default createPool
