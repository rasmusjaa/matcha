import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import userRouter from './controllers/users'
import interestRouter from './controllers/interests'
import imagesRouter from './controllers/images'
import signInRouter from './controllers/signin'
import signOutRouter from './controllers/signout'
import likesRouter from './controllers/like'

import cookieParser from 'cookie-parser'

import * as middleware from './utils/middleware'

const app = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))
// app.use(middleware.requestLogger)

app.use(function (req: Request, res: Response, next: NextFunction) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
	next();
});

app.use('/api/signin', signInRouter)
app.use('/api/signout', signOutRouter)
app.use(middleware.cookieChecker)
app.use('/api/users', userRouter)
app.use('/api/interests', interestRouter)
app.use('/api/user_images', imagesRouter)
app.use('/api/likes', likesRouter)

app.use(middleware.errorHandler)

export default app
