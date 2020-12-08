import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const ProfileBio = ({ biography = '' }) => {
	return (
		<Grid item xs={12}>
			<Typography variant="body1" color="textSecondary" paragraph>
				{biography}
			</Typography>
		</Grid>
	)
}

export default ProfileBio
