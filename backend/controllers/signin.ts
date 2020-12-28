import express from 'express'
import { getUser } from './usersFunctions'
import signToken from './signinFunctions'

const signInRouter = express.Router()

signInRouter.post('/', (req, res) => {
	getUser(req.body)
	.then(response => {
		if (response === null) {
			console.log('res: ', response)
			res.status(401).send('Wrong password');
		}
		else {
			const token = signToken(response)
			res.cookie('token', token, { httpOnly: true })
			console.log(token)
			res.status(200).json({ token })
		}
	})
	.catch(error => {
		console.log(error)
		res.status(500).send(error);
	})
})

export default signInRouter
