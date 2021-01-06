import React from 'react'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import like from '../../services/like'

const useStyles = makeStyles((Theme) => ({
	likeButtons: {
		width: '75px',
	},
	dislikeButton: {
		color: 'red',
	},
	likeButton: {
		color: Theme.palette.primary.main,
	},
	ageLocation: {
		paddingTop: '16px',
	},
}))

const AgeLocation = ({ age = 0, location = '', id = 0 }) => {
	const classes = useStyles()
	return (
		<>
			<Grid item className={classes.likeButtons}>
				<IconButton
					onClick={() => {
						console.log('clicked')
						like(id)
					}}
					className={classes.dislikeButton}
				>
					<ThumbDownRoundedIcon fontSize="large" />
				</IconButton>
			</Grid>
			<Grid item xs>
				<Typography
					variant="h6"
					color="textSecondary"
					align="center"
					paragraph
					className={classes.ageLocation}
				>
					{age}, {location}
				</Typography>
			</Grid>
			<Grid item className={classes.likeButtons}>
				<IconButton className={classes.likeButton}>
					<ThumbUpRoundedIcon fontSize="large" />
				</IconButton>
			</Grid>
		</>
	)
}

const AgeLocationMini = ({ age = 0, location = '' }) => {
	const classes = useStyles()
	return (
		<>
			<Grid item xs>
				<Typography
					variant="h6"
					color="textSecondary"
					align="left"
					paragraph
					className={classes.ageLocation}
				>
					{age}, {location}
				</Typography>
			</Grid>
		</>
	)
}

export { AgeLocation, AgeLocationMini }
