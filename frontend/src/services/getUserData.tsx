import axios from 'axios'

const getInterests = (ids: number[] = [], setHashtags: Function) => {
	const interests: number[] = []
	const promises: Promise<void>[] = []
	ids.forEach((id) => {
		promises.push(
			axios
				.get(`http://localhost:3001/interests/${id}`)
				.then((response) => {
					interests.push(response.data.interest)
				})
				.catch((error) => {
					console.log(error)
				})
		)
	})
	Promise.all(promises).then(() => setHashtags(interests))
}

const getUserPics = (ids: number[] = [], setUserPics: Function) => {
	const userPics: string[] = []
	const promises: Promise<void>[] = []
	ids.forEach((id) => {
		promises.push(
			axios
				.get(`http://localhost:3001/user_pics/${id}`)
				.then((response) => {
					userPics.push(response.data.filename)
				})
				.catch((error) => {
					console.log(error)
				})
		)
	})
	Promise.all(promises).then(() => setUserPics(userPics))
}

const getProfileInfo = async (
	id: number,
	setProfile: Function,
	setHashtags: Function,
	setUserPics: Function
) => {
	await axios
		.get(`http://localhost:3001/users/${id}`)
		.then((response) => {
			setProfile(response.data)
			getInterests(response.data.interests, setHashtags)
			getUserPics(response.data.user_pics, setUserPics)
		})
		.catch((error) => {
			console.log(error)
		})
}

export default getProfileInfo
