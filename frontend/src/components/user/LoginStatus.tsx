import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const LoginStatus = ({ loggedIn = true, lastLogin = '' }) => {
	const momento = dayjs().to(lastLogin)
	if (loggedIn)
		return (
			<Grid item xs={12}>
				<Typography
					variant="h6"
					align="center"
					color="primary"
					gutterBottom
					paragraph
				>
					Online now
				</Typography>
			</Grid>
		)
	return (
		<Grid item xs={12}>
			<Typography
				variant="h6"
				align="center"
				color="textSecondary"
				gutterBottom
				paragraph
			>
				Last seen: {momento}
			</Typography>
		</Grid>
	)
}

export default LoginStatus
