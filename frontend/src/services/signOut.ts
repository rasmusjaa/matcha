import axios from 'axios'

const clearCookies = async () => {
	try {
		const response = await axios.get('/api/signout')
		console.log(response)
		if (response.status === 200) return true
	} catch (err) {
		return false
	}
	return false
}

export default clearCookies
