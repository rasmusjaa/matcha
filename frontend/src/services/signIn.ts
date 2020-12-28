import axios from 'axios'

const signIn = async (formdata: { userName: string; password: string }) => {
	try {
		const response = await axios.post('/signin', formdata)
		if (response.status === 200) return true
	} catch (err) {
		return false
	}
	return false
}

export default signIn
