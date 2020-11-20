import React from 'react'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const Copyright = () => {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{'Copyright © '}
			<Link color="inherit" href="https://github.com/cleisti" target="_blank">
				cleisti
			</Link>{' '}
			<Link color="inherit" href="https://github.com/rasmusjaa" target="_blank">
				rjaakonm
			</Link>{' '}
			{new Date().getFullYear()}.
		</Typography>
	)
}

export default Copyright
