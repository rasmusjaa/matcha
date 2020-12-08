import React from 'react'
import Badge from '@material-ui/core/Badge'
import StarIcon from '@material-ui/icons/Star'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
	fameIcon: {
		fontSize: '1.5em',
		height: '70px',
		width: '70px',
	},
	fameBadge: {
		fontSize: '1em',
		height: '37px',
		width: '35px',
	},
}))

const Fame = ({ fame = '' }) => {
	const classes = useStyles()
	return (
		<Badge
			badgeContent={fame}
			className={classes.fameBadge}
			color="primary"
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'right',
			}}
		>
			<StarIcon className={classes.fameIcon} color="primary" />
		</Badge>
	)
}

export default Fame
