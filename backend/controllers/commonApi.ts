import createPool from '../pool'

const getRowsFromTable = (table: string) => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		pool.query(`SELECT * FROM ${table} ORDER BY id ASC`, (error: any, results: any) => {
			if (error) {
				reject(error)
			} else {
				resolve(results.rows)
			}
            pool.end()
		})
	}) 
}

const getRowFromTable = (id: string, table: string) => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		pool.query(`SELECT * FROM ${table} WHERE id = $1 LIMIT 1`, [id], (error: any, results: any) => {
			if (error) {
				reject(error)
			} else {
				resolve(results.rows[0])
			}
            pool.end()
		})
	}) 
}

const deleteWithId = (id: string, table: string) => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING (select_list | *)`, [id], (error: any, results: any) => {
			if (error) {
				console.log(error);
				reject(error)
			} else {
				resolve(results.rows[0])
			}
			pool.end()
		})
	})
}

export {
    getRowsFromTable,
    getRowFromTable,
    deleteWithId
}
