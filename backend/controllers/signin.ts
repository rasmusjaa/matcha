import express from 'express'
import { getUser } from './usersFunctions'
import signToken from './signinFunctions'

const signInRouter = express.Router()

signInRouter.post('/', (req, res) => {
	getUser(req.body)
	.then(response => {
		if (response === null) {
			res.status(401).send('Wrong password');
		}
		else {
			const token = signToken(response)
			const cookie = {
				username: response.username,
				id: response.id,
			}
			res.cookie('matcha-token', token, { httpOnly: true })
			res.cookie('matcha-cookie', cookie)
			res.status(200).json(cookie)
		}
	})
	.catch(error => {
		res.status(500).send(error);
	})
})

export default signInRouter
