import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from './../utils/config'

const signToken = (response: any) => {
	const token = jsonwebtoken.sign(
		{
			userId: response.id,
			username: response.username
		},
		JWT_SECRET,
		{
			expiresIn: 1800
		}
	)
	return token
}

export default signToken
