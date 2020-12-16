import bcrypt from 'bcrypt'
import createPool from './pool'

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
			bcrypt.hashSync(user.password, 5),
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

interface ProfileInfo {
	id: number
	email: string
	username: string
	password: string
	name: string[]
	birth_date: string
	gender: number
	sexual_preferences: number[]
	biography: string
	fame: number
	test: string
	location: string[]
	interests: number[]
	profile_pic_file: string
	pic_ids: number[]
	logged_in: boolean
	last_login_timestamp: string
}

const getUser = (user: any): Promise<ProfileInfo | null> => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		pool.query(`SELECT * FROM users WHERE username = $1 LIMIT 1`, [user.userName], (error: any, results: any) => {
			if (error) {
				reject(error)
			} else {
				if  (results.rows[0] && bcrypt.compareSync(user.password, results.rows[0].password))
					resolve(results.rows[0])
				else
					resolve(null)
			}
			pool.end()
		})
	}) 
}

export {
	createUser,
	getUser
}
