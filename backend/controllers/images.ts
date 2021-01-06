import express from 'express'
import { createImage } from './imagesFunctions'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonDBFunctions'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

const imagesRouter = express.Router()

imagesRouter.get('/', (req, res) => {
	getRowsFromTable('user_images')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

imagesRouter.get('/:id', (req, res) => {
	getRowFromTable(req.params.id, 'user_images')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

imagesRouter.post('/', (req, res) => {
	createImage(req.body)
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

imagesRouter.delete('/:id', (req, res) => {
	deleteWithId(req.params.id, 'user_images')
		.then(response => {
			res.status(200).send(response);
		})
		.catch(error => {
			res.status(500).send(error);
		})
})

export default imagesRouter
