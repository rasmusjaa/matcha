const express = require('express')
const pool = require('./pool')
const app = express()
const port = 3002

app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

const camilla = {
	"id": 1,
	"email": "camilla.leisti@gmail.com",
	"username": "cleisti",
	"password": "",
	"name": {
		"first": "Camilla",
		"last": "Leisti"
	},
	"birth_date": "1993-07-20T21:00:00.000Z",
	"gender": "female",
	"sexual_preferences": [
		"male", "female", "other"
	],
	"biography": "this is my story",
	"location": {
		"lat": 60.1699,
		"lon": 24.9384
	},
	"interests": [1, 2, 3],
	"profile_pic_file": "img1",
	"user_pics": [1, 2, 3, 4],
	"logged_in": false,
	"last_login_timestamp": "2020-12-02T18:00:00.000Z"
}

const getUsers = () => {
	return new Promise(function(resolve, reject) {
		pool.query('SELECT * FROM Users ORDER BY id ASC', (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(results.rows);
		})
	}) 
}

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

const createUser = (user) => {
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
			user_pics
		)
		VALUES ($1, $2, $3, ARRAY[$4, $5], $6, $7, $8::gender[], $9, ROW($10, $11), $12, $13, $14) RETURNING * ;`
		const values = [
			user.email,
			user.username,
			user.password,
			user.name.first,
			user.name.last,
			user.birth_date,
			user.gender,
			user.sexual_preferences,
			user.biography,
			user.location.lat,
			user.location.lon,
			user.interests,
			user.profile_pic_file,
			user.user_pics
		]
		pool.query(sql, values, (error, results) => {
			if (error) {
				console.log('is error');
				reject(error)
			}
			else {
				resolve(`A new User has been added added: ${results.rows[0]}`)
			}
			pool.end()
		})
	})
}

const deleteUser = (id) => {
	return new Promise(function(resolve, reject) {
		pool.query('DELETE FROM Users WHERE id = $1', [id], (error, results) => {
			if (error) {
				console.log(error);
				reject(error)
			} else {
				console.log('ok');
				resolve(`User deleted with ID: ${id}`)
			}
			pool.end()
		})
	})
}

deleteUser(5)
//createUser(camilla)
//console.log(camilla.location);

// app.get('/', (req, res) => {
// 	getUsers()
// 	.then(response => {
// 		res.status(200).send(response);
// 	})
// 	.catch(error => {
// 		res.status(500).send(error);
// 	})
// })
  
// app.post('/users', (req, res) => {
// 	createUser(req.body)
// 	.then(response => {
// 		res.status(200).send(response);
// 	})
// 	.catch(error => {
// 		res.status(500).send(error);
// 	})
// })
  
// app.delete('/users/:id', (req, res) => {
// 	deleteUser(req.params.id)
// 	.then(response => {
// 		res.status(200).send(response);
// 	})
// 	.catch(error => {
// 		res.status(500).send(error);
// 	})
// })

// app.listen(port, () => {
// 	console.log(`App running on port ${port}.`)
// })
