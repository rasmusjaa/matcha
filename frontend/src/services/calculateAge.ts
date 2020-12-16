import dayjs from 'dayjs'

const calculateAge = (birth_date = ''): number => {
	return dayjs().diff(birth_date, 'year')
}

export default calculateAge
