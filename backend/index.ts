import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { createUser } from './userApi'
import { createInterest } from './interestApi'
import { createImage } from './imageApi'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonApi'

const app = express()
const port = 3001

app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(function (req: Request, res: Response, next: NextFunction) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

app.get('/users', (req, res) => {
	getRowsFromTable('users')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.get('/users/:id', (req, res) => {
	getRowFromTable(req.params.id, 'users')
	.then(response => {
		console.log(response)
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
	deleteWithId(req.params.id, 'users')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.get('/interests', (req, res) => {
	getRowsFromTable('interests')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.get('/interests/:id', (req, res) => {
	getRowFromTable(req.params.id, 'interests')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.post('/interests', (req, res) => {
	createInterest(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.delete('/interests/:id', (req, res) => {
	deleteWithId(req.params.id, 'interests')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.get('/user_images', (req, res) => {
	getRowsFromTable('user_images')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.get('/user_images/:id', (req, res) => {
	getRowFromTable(req.params.id, 'user_images')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.post('/user_images', (req, res) => {
	createImage(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

app.delete('/user_images/:id', (req, res) => {
	deleteWithId(req.params.id, 'user_images')
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
