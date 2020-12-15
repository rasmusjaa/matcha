import createPool from './pool'
import { deleteWithId } from './commonApi'

const createImage = (image: any) => {
	const pool = createPool()
	return new Promise(function(resolve, reject) {
		const sql = `
		INSERT INTO user_images (
			filename,
			user_id
		)
		VALUES ($1, $2) RETURNING * ;`
		const values = [
			image.filename,
			image.user_id
		]
		pool.query(sql, values, (error: any, results: any) => {
			if (error) {
				reject(error)
			}
			else {
				resolve(`A new User has been added added: ${results.rows[0]}`)
			}
			pool.end()
		})
	})
}

const deleteImage = (imgId: string) => {
	const deletedRow = deleteWithId(imgId, 'user_images')
	// + delete image from backend
}

export {
	createImage,
	deleteImage
}
