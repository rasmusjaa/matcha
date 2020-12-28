import dotenv from 'dotenv'
import { Secret } from 'jsonwebtoken'
dotenv.config()

const PORT = process.env.PORT || 3001
const JWT_SECRET: Secret = process.env.JWT_SECRET || 'MAKE_SURE_YOU_HAVE_ENV_SECRET'
const DB_PW = process.env.DB_PW || 'no password'

export {
	PORT,
	JWT_SECRET,
	DB_PW
}
