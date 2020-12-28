import express from 'express'
import { createInterest } from './interestsFunctions'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonDBFunctions'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

const interestRouter = express.Router()

interestRouter.get('/', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	getRowsFromTable('interests')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

interestRouter.get('/:id', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	getRowFromTable(req.params.id, 'interests')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

interestRouter.post('/', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	createInterest(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

interestRouter.delete('/:id', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	deleteWithId(req.params.id, 'interests')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

export default interestRouter
