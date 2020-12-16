import axios from 'axios'

const signIn = (formdata: { userName: string; password: string }) => {
	axios
		.post('http://localhost:3001/signin', formdata)
		.then((response) => {
			if (response.status === 200) console.log(response.data)
			if (response.status === 204) console.log(response.statusText)
		})
		.catch((error) => {
			console.log(error)
		})
}

export default signIn
