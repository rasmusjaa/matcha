import createPool from './pool'

// INSERT INTO users (
// 	email,
// 	username,
// 	password,
// 	name,
// 	birth_date,
// 	gender,
// 	sexual_preferences,
// 	biography,
// 	location,
// 	interests,
// 	profile_pic_file,
// 	user_pics
// )
// VALUES ('test', 'string', 'string', ARRAY['string', 'string'], '1993-07-20T21:00:00.000Z', 'female', ARRAY['male','female','other']::gender[],
// 		'bio', ROW(60.1699, 60.1699), ARRAY[1, 2, 3], 'file', ARRAY[1, 2, 3]) RETURNING * ;

const createUser = (user: any) => {
//     user.interest: string[]
//    ->  user.interestID: number[]
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		const sql = `
		INSERT INTO users (
			email,
			username,
			password,
			name,
			birth_date,
			gender,
			sexual_preferences,
			biography,
			location,
			interests,
			profile_pic_file,
            user_pics,
            last_login_timestamp
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING * ;`
		const values = [
			user.email.toLowerCase(),
			user.username,
			user.password,
			user.name,
			user.birth_date,
			user.gender,
			user.sexual_preferences,
			user.biography,
			user.location,
			user.interests,
			user.profile_pic_file,
            user.user_pics,
            new Date()
		]
		pool.query(sql, values, (error: any, results: any) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(results.rows[0])
			}
			pool.end()
		})
	})
}

const getUser = (user: any) => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		pool.query(`SELECT * FROM users WHERE username = $1 AND password = $2 LIMIT 1`, [user.userName, user.password], (error: any, results: any) => {
			if (error) {
				reject(error)
			} else {
				resolve(results.rows[0])
			}
            pool.end()
		})
	}) 
}

export {
	createUser,
	getUser
}
