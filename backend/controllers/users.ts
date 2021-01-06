import express from 'express'
import { createUser, getUser } from './usersFunctions'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonDBFunctions'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

const userRouter = express.Router()

userRouter.post('/', (req, res) => {
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

userRouter.get('/', (req, res, next) => {
	getRowsFromTable('users')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

userRouter.get('/:id', (req, res) => {
	getRowFromTable(req.params.id, 'users')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

userRouter.delete('/:id', (req, res) => {
	deleteWithId(req.params.id, 'users')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})	
})

export default userRouter
