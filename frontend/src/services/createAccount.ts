import axios from 'axios'

const createAccount = (formdata: {
	username: string
	firstName: string
	lastName: string
	email: string
	password: string
}) => {
	axios
		.post('http://localhost:3001/users', formdata)
		.then((response) => {
			console.log(response.data)
		})
		.catch((error) => {
			console.log(error.statusText)
			if (error === 'username') console.log('username')
			else if (error === 'email') console.log('email')
			else console.log('undefined error')
		})
}

export default createAccount
