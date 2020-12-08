import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SRLWrapper } from 'simple-react-lightbox'
import Grid from '@material-ui/core/Grid'
import UserImage from './UserImage'

const UserImageGrid = ({ filenames = [''], profilePic = '' }) => {
	return (
		<SRLWrapper>
			<Grid container spacing={4}>
				{filenames.map((filename) =>
					filename !== profilePic ? (
						<UserImage key={filename} filename={filename} />
					) : (
						''
					)
				)}
			</Grid>
		</SRLWrapper>
	)
}

export default UserImageGrid
