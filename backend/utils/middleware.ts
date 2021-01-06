import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'
import signToken from '../controllers/signinFunctions'

const requestLogger = (request: any, response: any, next: Function) => {
	console.log('Method:', request.method)
	console.log('Path:  ', request.path)
	console.log('Body:  ', request.body)
	console.log('---')
	next()
}

const cookieChecker = (request: any, response: any, next: Function) => {
	if (request.method === 'POST' && request.path === '/api/users')
		next()
	else if (request.cookies['matcha-token'] &&
		request.cookies['matcha-cookie'] &&
		request.cookies['matcha-cookie']['id'] &&
		request.cookies['matcha-cookie']['username']
	) {
		try {
			const decodedToken: any = jsonwebtoken.verify(request.cookies['matcha-token'], JWT_SECRET)
			const token = signToken({
				username: request.cookies['matcha-cookie']['username'],
				id: request.cookies['matcha-cookie']['id']
			})
			response.cookie('matcha-token', token, { httpOnly: true })
		} catch (e) {
			response.cookie('matcha-cookie', '')
		}
		next()
	}
	else
	{
		response.cookie('matcha-cookie', '')
		response.status(401).send({ error: 'not logged in' })
	}
		
}

const errorHandler = (error: any, request: any, response: any, next: Function) => {if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
    }
    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: error.message })
	}

	next(error)
}

export {
	errorHandler,
	cookieChecker,
	requestLogger
}
