import React from 'react'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

const Hashtags = ({ hashtags = [''] }) => {
	return (
		<Grid item xs={12}>
			{hashtags.map((hash) => (
				<Chip
					key={hash}
					color="primary"
					variant="outlined"
					label={`#${hash}`}
				/>
			))}
		</Grid>
	)
}

export default Hashtags
