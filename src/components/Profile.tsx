import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
// import Link from '@material-ui/core/Link'

const useStyles = makeStyles((Theme) => ({
	icon: {
		marginRight: Theme.spacing(2),
	},
	heroContent: {
		backgroundColor: Theme.palette.background.paper,
		padding: Theme.spacing(8, 0, 6),
	},
	divWithMargin: {
		marginTop: Theme.spacing(4),
	},
	cardGrid: {
		paddingTop: Theme.spacing(8),
		paddingBottom: Theme.spacing(8),
	},
	card: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		marginTop: Theme.spacing(4),
		paddingTop: '100%', // 16:9
		height: '100%',
		backgroundSize: 'contain',
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
	interest: {
		backgroundColor: Theme.palette.primary.main,
		padding: Theme.spacing(0.5),
		paddingLeft: Theme.spacing(1.5),
		paddingRight: Theme.spacing(1.5),
		margin: Theme.spacing(0.5),
		textDecoration: 'none',
		borderRadius: '15%',
		display: 'inline-grid',
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
	birth_date: Date
	gender: string
	sexual_preferences: string[]
	biography: string
	fame: number
	test: string
	location: string
	interests: number[]
	profile_pic_id: number
	pic_ids: number[]
	logged_in: boolean
	last_login_timestamp: Date
}

const Name = ({ name = '' }) => {
	return (
		<Typography
			component="h1"
			variant="h2"
			align="center"
			color="textPrimary"
			gutterBottom
		>
			{name}
		</Typography>
	)
}

const getInterests = (ids: number[] = [], setHashtags: Function) => {
	const interests: number[] = []
	const promises: Promise<void>[] = []
	ids.forEach((id) => {
		promises.push(
			axios
				.get(`http://localhost:3001/interests/${id}`)
				.then((response) => {
					interests.push(response.data.interest)
				})
				.catch((error) => {
					console.log(error)
				})
		)
	})
	Promise.all(promises).then(() => setHashtags(interests))
}

const getUserPics = (ids: number[] = [], setUserPics: Function) => {
	const userPics: number[] = []
	const promises: Promise<void>[] = []
	ids.forEach((id) => {
		promises.push(
			axios
				.get(`http://localhost:3001/user_pics/${id}`)
				.then((response) => {
					userPics.push(response.data.id)
				})
				.catch((error) => {
					console.log(error)
				})
		)
	})
	Promise.all(promises).then(() => setUserPics(userPics))
}

const getProfileInfo = async (
	id: number,
	setProfile: Function,
	setHashtags: Function,
	setUserPics: Function
) => {
	await axios
		.get(`http://localhost:3001/users/${id}`)
		.then((response) => {
			setProfile(response.data)
			getInterests(response.data.interests, setHashtags)
			getUserPics(response.data.user_pics, setUserPics)
		})
		.catch((error) => {
			console.log(error)
		})
}

const Profile = () => {
	const classes = useStyles()
	const [hashtags, setHashtags] = useState<string[]>([])
	const [profileInfo, setProfile] = useState<ProfileInfo>()
	const [userPics, setUserPics] = useState<number[]>([])

	useEffect(() => {
		getProfileInfo(1, setProfile, setHashtags, setUserPics)
	}, [])
	return (
		<>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<main>
				<Container className={classes.cardGrid} maxWidth="md">
					<Container maxWidth="sm">
						<Name name={profileInfo?.name.first} />
						<Card className={classes.card}>
							<CardMedia
								component="img"
								image={`/user_pics/${profileInfo?.profile_pic_id}.jpg`}
								title="Your profile picture"
							/>
						</Card>
						<div className={classes.divWithMargin}>
							<Grid container spacing={2} justify="center">
								<Grid item xs={12}>
									<Typography
										variant="h5"
										align="center"
										color="textSecondary"
										paragraph
									>
										{profileInfo?.biography}
									</Typography>
								</Grid>
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
							</Grid>
						</div>
					</Container>
					<Grid container spacing={4}>
						{userPics.map((pic) => (
							<Grid item key={pic} xs={12} sm={6} md={4}>
								<Card className={classes.card}>
									<CardMedia
										className={classes.cardMedia}
										image={`/user_pics/${pic}.jpg`}
										title="Image title"
									/>
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
