import axios from 'axios'

const like = async (id: number) => {
	try {
		const response = await axios.post('/api/likes', id)
		if (response.status === 200) return true
	} catch (err) {
		return false
	}
	return false
}

export default like
