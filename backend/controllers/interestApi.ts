import createPool from '../pool'

const createInterest = (interest: string) => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		const sql = `
		INSERT INTO interests (
			interest
		)
		VALUES ($1) RETURNING * ;`
		const values = [
			interest.toLowerCase()
		]
		pool.query(sql, values, (error: any, results: any) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(`A new User has been added added: ${results.rows[0]}`)
			}
			pool.end()
		})
	})
}

export {
	createInterest
}
