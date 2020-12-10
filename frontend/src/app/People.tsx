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
import Fame from '../components/user/Fame'
import Hashtags from '../components/user/Hashtags'
import { AgeLocationMini } from '../components/user/AgeLocation'
import calculateAge from '../services/calculateAge'

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
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '0%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
}))

interface ProfileInfo {
	id: number
	email: string
	username: string
	password: string
	name: {
		first: string
		last: string
	}
	birth_date: string
	gender: string
	sexual_preferences: string[]
	biography: string
	fame: number
	test: string
	location: string
	interests: number[]
	profile_pic_file: string
	pic_ids: number[]
	logged_in: boolean
	last_login_timestamp: string
}

interface Hashtag {
	id: number
	interest: string
}

const getInterestNames = (
	userInterests: number[],
	allInterests: Hashtag[]
): string[] => {
	if (allInterests !== undefined) {
		return allInterests
			.filter((hashtag) => userInterests.includes(hashtag.id))
			.map((hash) => hash.interest)
	}
	return ['']
}

const getInterests = async (setHashtags: Function) => {
	await axios
		.get('http://localhost:3001/interests')
		.then((response) => {
			setHashtags(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
}

const getUsers = async (setUsers: Function) => {
	await axios
		.get('http://localhost:3001/users')
		.then((response) => {
			setUsers(response.data)
		})
		.catch((error) => {
			console.log(error)
		})
}

const People = () => {
	const classes = useStyles()
	const [users, setUsers] = useState<ProfileInfo[]>()
	const [hashtags, setHashtags] = useState<Hashtag[]>()

	useEffect(() => {
		getUsers(setUsers)
		getInterests(setHashtags)
	}, [])

	return (
		<>
			<Helmet>
				<title>Browse</title>
			</Helmet>
			<main>
				{/* Hero unit */}
				<div className={classes.heroContent}>
					<Container maxWidth="sm">
						<Typography
							component="h1"
							variant="h2"
							align="center"
							color="textPrimary"
							gutterBottom
						>
							Browse
						</Typography>
						<Typography
							variant="h5"
							align="center"
							color="textSecondary"
							paragraph
						>
							Go have a look at our selection of prime individuals!
						</Typography>
						<div className={classes.heroButtons}>
							<Grid container spacing={2} justify="center">
								<Grid item>
									<Button variant="outlined" color="primary">
										Add filter
									</Button>
								</Grid>
								<Grid item>
									<Button variant="contained" color="primary">
										Search
									</Button>
								</Grid>
							</Grid>
						</div>
					</Container>
				</div>
				<Container className={classes.cardGrid} maxWidth="md">
					{/* End hero unit */}
					<Grid container spacing={4}>
						{users?.map((user) => (
							<Grid item key={user.id} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<Fame fame={user.fame.toString()} />
									<Grid>
										<CardMedia
											component="img"
											className={classes.cardMedia}
											image={`/user_pics/${user.profile_pic_file}.jpg`}
											title="Image title"
										/>
									</Grid>
									<CardContent className={classes.cardContent}>
										<Typography gutterBottom variant="h5" component="h2">
											{user.name.first}
										</Typography>
										<AgeLocationMini
											age={calculateAge(user.birth_date)}
											location={user.location}
										/>
										<Hashtags
											hashtags={getInterestNames(user.interests, hashtags!)}
										/>
									</CardContent>
									<CardActions>
										<Button size="small" color="primary">
											View
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

export default People
