import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
// import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Copyright from '../components/Copyright'
import createAccount from '../services/createAccount'

const useStyles = makeStyles((theme) => ({
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/random)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const SignUp = () => {
	const classes = useStyles()
	const [signUpForm, setSignUpForm] = useState({
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	})
	const submitCreateForm = (e: any) => {
		e.preventDefault()
		console.log('test')
		createAccount(signUpForm)
	}
	const onChange = (e: any) => {
		setSignUpForm({ ...signUpForm, [e.target.name]: e.target.value })
	}

	return (
		<>
			<Helmet>
				<title>Create Account</title>
			</Helmet>
			<main>
				<Grid container component="main" className={classes.root}>
					<CssBaseline />
					<Grid item xs={false} sm={4} md={7} className={classes.image} />
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={6}
						square
					>
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<p>avatar</p>
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign up
							</Typography>
							<ValidatorForm
								className={classes.form}
								onSubmit={submitCreateForm}
							>
								<TextValidator
									value={signUpForm.username}
									onChange={onChange}
									autoComplete="username"
									name="username"
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="username"
									label="Username"
									autoFocus
									validators={[
										'required',
										'minStringLength:3',
										'maxStringLength:50',
									]}
									errorMessages={[
										'this field is required',
										'Must be at least 3 characters',
										'Must be at most 30 characters',
									]}
								/>
								<TextValidator
									value={signUpForm.firstName}
									onChange={onChange}
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="firstName"
									label="First Name"
									validators={[
										'required',
										'minStringLength:3',
										'maxStringLength:50',
									]}
									errorMessages={[
										'this field is required',
										'Must be at least 2 characters',
										'Must be at most 50 characters',
									]}
								/>
								<TextValidator
									value={signUpForm.lastName}
									onChange={onChange}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									validators={[
										'required',
										'minStringLength:3',
										'maxStringLength:50',
									]}
									errorMessages={[
										'this field is required',
										'Must be at least 2 characters',
										'Must be at most 50 characters',
									]}
								/>
								<TextValidator
									value={signUpForm.email}
									onChange={onChange}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									validators={['required', 'isEmail', 'maxStringLength:254']}
									errorMessages={[
										'this field is required',
										'Must be valid email',
										'Must be at most 254 characters',
									]}
								/>
								<TextValidator
									value={signUpForm.password}
									onChange={onChange}
									variant="outlined"
									margin="normal"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									validators={[
										'required',
										'minStringLength:8',
										'maxStringLength:254',
										'matchRegexp:^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])',
									]}
									errorMessages={[
										'this field is required',
										'Must be at least 8 characters',
										'Must be at most 254 characters',
										'Must contain at least 1 number, 1 lowercase and one uppercase letter',
									]}
								/>
								<FormControlLabel
									control={
										<Checkbox value="allowExtraEmails" color="primary" />
									}
									label="I am ready."
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Sign Up
								</Button>
								<Grid container justify="flex-end">
									<Grid item>
										<Link href="/" variant="body2">
											Already have an account? Sign in
										</Link>
									</Grid>
								</Grid>
							</ValidatorForm>
						</div>
						<Box mt={5}>
							<Copyright />
						</Box>
					</Grid>
				</Grid>
			</main>
		</>
	)
}

export default SignUp
