import axios from 'axios'

const createAccount = (
	formdata: {
		username: string
		firstName: string
		lastName: string
		email: string
		password: string
	},
	setSubmitResponse: Function,
	setSignUpForm: Function
) => {
	axios
		.post('http://localhost:3001/users', formdata)
		.then((response) => {
			console.log('here')
			console.log(response.data)
			if (response.data === 'username')
				setSubmitResponse({ text: 'Username already exists', error: true })
			else if (response.data === 'email')
				setSubmitResponse({ text: 'Email already exists', error: true })
			else {
				setSignUpForm({
					username: '',
					firstName: '',
					lastName: '',
					email: '',
					password: '',
				})
				setSubmitResponse({
					text:
						'Thanks for signing up, confirmation link has been sent to your email',
					error: false,
				})
			}
		})
		.catch(() => {
			setSubmitResponse({ text: 'Database not available', error: true })
		})
}

export default createAccount
