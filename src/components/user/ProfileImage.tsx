import React from 'react'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	card: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
}))

const ProfileImage = ({ profilePic = '' }) => {
	const classes = useStyles()
	return (
		<Card className={classes.card}>
			<CardMedia
				component="img"
				image={`/user_pics/${profilePic}.jpg`}
				title="Your profile picture"
			/>
		</Card>
	)
}

export default ProfileImage
