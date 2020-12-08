import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import calculateAge from '../services/calculateAge'
import getProfileInfo from '../services/getUserData'
import Name from '../components/user/Name'
import Fame from '../components/user/Fame'
import LoginStatus from '../components/user/LoginStatus'
import ProfileImage from '../components/user/ProfileImage'
import { AgeLocation } from '../components/user/AgeLocation'
import ProfileBio from '../components/user/ProfileBio'
import Hashtags from '../components/user/Hashtags'
import UserImageGrid from '../components/user/UserImageGrid'

const useStyles = makeStyles((Theme) => ({
	divWithMargin: {
		marginTop: Theme.spacing(1),
		marginBottom: Theme.spacing(2),
	},
	cardGrid: {
		paddingTop: Theme.spacing(4),
		paddingBottom: Theme.spacing(4),
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

const Profile = () => {
	const classes = useStyles()
	const [hashtags, setHashtags] = useState<string[]>([])
	const [profileInfo, setProfile] = useState<ProfileInfo>()
	const [userPics, setUserPics] = useState<string[]>([])

	useEffect(() => {
		getProfileInfo(3, setProfile, setHashtags, setUserPics)
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
