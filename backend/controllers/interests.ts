import express from 'express'
import { createInterest } from './interestsFunctions'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonDBFunctions'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

const interestRouter = express.Router()

interestRouter.get('/', (req, res) => {
	getRowsFromTable('interests')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

interestRouter.get('/:id', (req, res) => {
	getRowFromTable(req.params.id, 'interests')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

interestRouter.post('/', (req, res) => {
	createInterest(req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

interestRouter.delete('/:id', (req, res) => {
	deleteWithId(req.params.id, 'interests')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

export default interestRouter
