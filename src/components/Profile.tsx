import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import Link from '@material-ui/core/Link'

const useStyles = makeStyles((theme) => ({
	icon: {
		marginRight: theme.spacing(2),
	},
	heroContent: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 0, 6),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	card: {
		height: '100%',
		width: '100%',
		display: 'block',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	cardActions: {
		flexDirection: 'column',
	},
	logo: {
		fontSize: '3em',
		margin: '0 10px',
	},
}))

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface Hashtag {
	id: number
	interest: string
}

const Profile = () => {
	const classes = useStyles()
	const [hashtags, setHashtags] = useState<Hashtag[]>([])
	useEffect(() => {
		axios
			.get('http://localhost:3001/interests')
			.then((response) => {
				setHashtags(response.data)
			})
			.catch((error) => {
				console.log(error)
			})
	}, [])

	return (
		<>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<main>
				<Container className={classes.cardGrid} maxWidth="md">
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							Your profile &#9728;&#65039;
						</Typography>
						<Card className={classes.card}>
							<CardMedia
								className={classes.cardMedia}
								image="https://source.unsplash.com/random"
								title="Your profile picture"
							/>
							<CardActions className={classes.cardActions}>
								<Button size="small" color="primary">
									Edit
								</Button>
							</CardActions>
						</Card>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							Something short and leading about the collection below—its
							contents, the creator, etc. Make it short and sweet, but not too
							short so folks don&apos;t simply skip over it entirely.
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									{hashtags.map((hash) => (
										<Button key={hash.id} variant="outlined" color="primary">
											<p>#{hash.interest}</p>
										</Button>
									))}
								</Grid>
								<Grid item>
									<Button variant="contained" color="primary">
										Add hashtag
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
					<Grid container spacing={4}>
						{cards.map((card) => (
							<Grid item key={card} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image="https://source.unsplash.com/random"
										title="Image title"
									/>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											Heading
										</Typography>
										<Typography>
											This is a media card. You can use this section to describe
											the content.
										</Typography>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											View
										</Button>
										<Button size="small" color="primary">
											Edit
										</Button>
									</CardActions>
								</Card>
							</Grid>
						))}
					</Grid>
				</Container>
			</main>
		</>
	)
}

export default Profile
