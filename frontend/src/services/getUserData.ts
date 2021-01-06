import axios from 'axios'

interface Hashtag {
	id: number
	interest: string
}

const getInterests = (ids: number[] = [], setHashtags: Function) => {
	const interests: number[] = []
	const promises: Promise<void>[] = []
	ids.forEach((id) => {
		promises.push(
			axios
				.get(`/api/interests/${id}`)
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
				.get(`/api/user_images/${id}`)
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

// const getLike = (id: number = -1, setLiked: Function) => {
// 	axios.get(`/api/likes`)
// }

const getProfileInfo = async (
	id: number,
	setProfile: Function,
	setHashtags: Function,
	setUserPics: Function
) => {
	await axios
		.get(`/api/users/${id}`)
		.then((response) => {
			setProfile(response.data)
			getInterests(response.data.interests, setHashtags)
			getUserPics(response.data.user_pics, setUserPics)
		})
		.catch((error) => {
			console.log(error)
		})
}

const getInterestNames = (
	userInterests: number[],
	allInterests: Hashtag[]
): string[] => {
	if (allInterests !== undefined) {
		return allInterests
			.filter((hashtag) => userInterests.includes(hashtag.id))
			.map((hash) => hash.interest)
	}
	return ['']
}

const getAllInterests = async (setHashtags: Function) => {
	await axios
		.get('/api/interests')
		.then((response) => {
			setHashtags(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
}

const getUsers = async (setUsers: Function, id: number) => {
	await axios
		.get('/api/users')
		.then((response) => {
			const usersWithData = response.data.filter(
				(user: any) =>
					!!user.birth_date &&
					!!user.name[0] &&
					!!user.profile_pic_file &&
					!!user.location[0] &&
					user.id !== id
			)
			setUsers(usersWithData)
		})
		.catch((error) => {
			console.log(error)
		})
}

export { getProfileInfo, getInterestNames, getAllInterests, getUsers }
