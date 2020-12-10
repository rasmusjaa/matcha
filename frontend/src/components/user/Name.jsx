import React from 'react'
import Typography from '@material-ui/core/Typography'

const Name = ({ name = '' }) => {
	return (
		<Typography component="h1" variant="h2" align="center" color="textPrimary">
			{name}
		</Typography>
	)
}

export default Name
