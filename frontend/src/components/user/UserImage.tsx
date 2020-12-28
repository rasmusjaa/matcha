import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((Theme) => ({
	card: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
	},
	cardMedia: {
		marginTop: Theme.spacing(4),
		marginBottom: Theme.spacing(4),
		height: 'auto',
	},
}))

const UserImage = ({ filename = '' }) => {
	const classes = useStyles()
	if (filename === '') return <></>
	return (
		<Grid item key={filename} xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardMedia
					component="img"
					className={classes.cardMedia}
					image={`/user_pics/${filename}.jpg`}
					title="Image title"
				/>
			</Card>
		</Grid>
	)
}

export default UserImage
