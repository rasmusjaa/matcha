import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip'
import StarIcon from '@material-ui/icons/Star'
import ThumbUpRoundedIcon from '@material-ui/icons/ThumbUpRounded'
import ThumbDownRoundedIcon from '@material-ui/icons/ThumbDownRounded'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const useStyles = makeStyles((Theme) => ({
	icon: {
		marginRight: Theme.spacing(2),
	},
	heroContent: {
		backgroundColor: Theme.palette.background.paper,
		padding: Theme.spacing(8, 0, 6),
	},
	divWithMargin: {
		marginTop: Theme.spacing(1),
		marginBottom: Theme.spacing(2),
	},
	cardGrid: {
		paddingTop: Theme.spacing(4),
		paddingBottom: Theme.spacing(4),
	},
	card: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		marginTop: Theme.spacing(4),
		marginBottom: Theme.spacing(4),
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

const Name = ({ name = '' }) => {
	return (
		<Typography component="h1" variant="h2" align="center" color="textPrimary">
			{name}
		</Typography>
	)
}

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

const AgeLocation = ({ age = 0, location = '' }) => {
	const classes = useStyles()
	return (
		<>
			<Grid item className={classes.likeButtons}>
				<IconButton className={classes.dislikeButton}>
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

const ProfileBio = ({ biography = '' }) => {
	return (
		<Grid item xs={12}>
			<Typography variant="body1" color="textSecondary" paragraph>
				{biography}
			</Typography>
		</Grid>
	)
}

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

const UserImage = ({ filename = '' }) => {
	const classes = useStyles()
	return (
		<Grid item key={filename} xs={12} sm={6} md={4}>
			<Card className={classes.card}>
				<CardMedia
					className={classes.cardMedia}
					image={`/user_pics/${filename}.jpg`}
					title="Image title"
				/>
			</Card>
		</Grid>
	)
}

const UserImageGrid = ({ filenames = [''], profilePic = '' }) => {
	return (
		<Grid container spacing={4}>
			{filenames.map((filename) =>
				filename !== profilePic ? (
					<UserImage key={filename} filename={filename} />
				) : (
					''
				)
			)}
		</Grid>
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
	const userPics: string[] = []
	const promises: Promise<void>[] = []
	ids.forEach((id) => {
		promises.push(
			axios
				.get(`http://localhost:3001/user_pics/${id}`)
				.then((response) => {
					userPics.push(response.data.filename)
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

const calculateAge = (birth_date = ''): number => {
	return dayjs().diff(birth_date, 'year')
}

const Profile = () => {
	const classes = useStyles()
	const [hashtags, setHashtags] = useState<string[]>([])
	const [profileInfo, setProfile] = useState<ProfileInfo>()
	const [userPics, setUserPics] = useState<string[]>([])

	useEffect(() => {
		getProfileInfo(1, setProfile, setHashtags, setUserPics)
	}, [])
	const age = calculateAge(profileInfo?.birth_date)
	return (
		<>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<main>
				<Container className={classes.cardGrid} maxWidth="md">
					<Container maxWidth="sm">
						<Grid container spacing={2} justify="center">
							<Name name={profileInfo?.name.first} />
							<Fame fame={profileInfo?.fame.toString()} />
							<LoginStatus
								loggedIn={profileInfo?.logged_in}
								lastLogin={profileInfo?.last_login_timestamp}
							/>
						</Grid>
						<ProfileImage profilePic={profileInfo?.profile_pic_file} />
						<div className={classes.divWithMargin}>
							<Grid container spacing={2} justify="center">
								<AgeLocation age={age} location={profileInfo?.location} />
								<ProfileBio biography={profileInfo?.biography} />
								<Hashtags hashtags={hashtags} />
							</Grid>
						</div>
					</Container>
					<UserImageGrid
						filenames={userPics}
						profilePic={profileInfo?.profile_pic_file}
					/>
				</Container>
			</main>
		</>
	)
}

export default Profile
