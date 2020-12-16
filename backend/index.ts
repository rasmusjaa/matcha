import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import { createUser, getUser } from './userApi'
import { createInterest } from './interestApi'
import { createImage } from './imageApi'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonApi'
import jwt from 'express-jwt'
import jsonwebtoken from 'jsonwebtoken'
import cookieParser from 'cookie-parser'

const app = express()
const port = 3001
const jwtSecret = 'ThisIsSpecialMatchaSecret';

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use(function (req: Request, res: Response, next: NextFunction) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

app.post('/users', (req, res) => {
	req.body.name = [req.body.firstName, req.body.lastName]
	createUser(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		if (error.constraint === 'users_username_key')
			res.status(200).send('username');
		else if (error.constraint === 'users_email_key')
			res.status(200).send('email');
		else
			res.status(500).send(error);

	})
})

app.post('/signin', (req, res) => {
	getUser(req.body)
	.then(response => {
		if (response === null) {
			console.log('res: ', response)
			res.status(401).send('Wrong password');
		}
		else {
			const token = jsonwebtoken.sign({ userId: response.id, username: response.username }, jwtSecret)
			res.cookie('token', token, { httpOnly: true })
			console.log(token)
			res.status(200).json({ token });
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).send(error);
	})
})

app.use(cookieParser())

app.use(jwt({ secret: jwtSecret, algorithms: ['HS256'] }))

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

app.get('/jwt', (req, res) => {
	res.json({
	  token: jsonwebtoken.sign({ user: 'johndoe' }, jwtSecret)
	});
});

app.listen(port, () => {
	console.log(`App running on port ${port}.`)
})
