import express from 'express'
import { createImage } from './imagesFunctions'
import { getRowsFromTable, getRowFromTable, deleteWithId } from './commonDBFunctions'
import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

const imagesRouter = express.Router()

imagesRouter.get('/', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	getRowsFromTable('user_images')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

imagesRouter.get('/:id', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	getRowFromTable(req.params.id, 'user_images')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

imagesRouter.post('/', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	createImage(req.body)
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

imagesRouter.delete('/:id', (req, res) => {
	const decodedToken: any = jsonwebtoken.verify(req.cookies['token'], JWT_SECRET)
	deleteWithId(req.params.id, 'user_images')
	.then(response => {
		res.status(200).send(response);
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

export default imagesRouter
