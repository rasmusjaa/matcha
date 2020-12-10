const express = require('express')
const app = express()
const port = 3002

app.use(express.json())
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3002');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

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

const createUser = (body) => {
	return new Promise(function(resolve, reject) {
		const { name, email } = body
		pool.query('INSERT INTO Users (name, email) VALUES ($1, $2) RETURNING *', [name, email], (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(`A new User has been added added: ${results.rows[0]}`)
	  	})
	})
}
  const deleteUser = () => {
	return new Promise(function(resolve, reject) {
		const id = parseInt(request.params.id)
		pool.query('DELETE FROM Users WHERE id = $1', [id], (error, results) => {
			if (error) {
				reject(error)
			}
			resolve(`User deleted with ID: ${id}`)
		})
	})
}

app.get('/', (req, res) => {
	getUsers()
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})
  
  app.post('/users', (req, res) => {
	createUser(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})
  
  app.delete('/users/:id', (req, res) => {
	deleteUser(req.params.id)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
