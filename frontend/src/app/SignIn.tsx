import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Copyright from '../components/Copyright'
import signIn from '../services/signIn'

type State = {
	username: string
	password: string
	isButtonDisabled: boolean
	helperText: string
	isError: boolean
}

const initialState: State = {
	username: '',
	password: '',
	isButtonDisabled: true,
	helperText: '',
	isError: false,
}

type Action =
	| { type: 'setUsername'; payload: string }
	| { type: 'setPassword'; payload: string }
	| { type: 'setIsButtonDisabled'; payload: boolean }
	| { type: 'loginSuccess'; payload: string }
	| { type: 'loginFailed'; payload: string }
	| { type: 'setIsError'; payload: boolean }

const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case 'setUsername':
			return {
				...state,
				username: action.payload,
			}
		case 'setPassword':
			return {
				...state,
				password: action.payload,
			}
		case 'setIsButtonDisabled':
			return {
				...state,
				isButtonDisabled: action.payload,
			}
		case 'loginSuccess':
			return {
				...state,
				helperText: action.payload,
				isError: false,
			}
		case 'loginFailed':
			return {
				...state,
				helperText: action.payload,
				isError: true,
			}
		case 'setIsError':
			return {
				...state,
				isError: action.payload,
			}
		default:
			return {
				...state,
				isError: true,
			}
	}
}

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
		height: '150px',
		width: '150px',
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	logo: {
		fontSize: '5em',
		margin: '0 10px',
	},
}))

const Login = () => {
	const classes = useStyles()
	const [loginInfo, setLoginInfo] = useState({
		userName: '', // unique
		firstName: '',
		lastName: '',
		email: '', // valid email
		password: '',
	})

	const submitCreateForm = (e: any) => {
		e.preventDefault()
		console.log('test')
		console.log(loginInfo)
		signIn(loginInfo)
	}
	const onChange = (e: any) => {
		setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value })
	}

	return (
		<>
			<Helmet>
				<title>Sign In</title>
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
								<p className={classes.logo}>&#127861;</p>
							</Avatar>
							<Typography component="h1" variant="h5">
								Sign in
							</Typography>
							<ValidatorForm
								className={classes.form}
								onSubmit={submitCreateForm}
							>
								<TextValidator
									value={loginInfo.userName}
									onChange={onChange}
									autoComplete="username"
									name="userName"
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="userName"
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
									value={loginInfo.password}
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
										'minStringLength:7',
										'maxStringLength:254',
									]}
									errorMessages={[
										'this field is required',
										'Must be at least 7 characters',
										'Must be at most 254 characters',
									]}
								/>
								<FormControlLabel
									control={<Checkbox value="remember" color="primary" />}
									label="Remember me"
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
								>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href="/forgot" variant="body2">
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link href="/create" variant="body2">
											Sign Up
										</Link>
									</Grid>
								</Grid>
							</ValidatorForm>
							<Box mt={5}>
								<Copyright />
							</Box>
						</div>
					</Grid>
				</Grid>
			</main>
		</>
	)
}

export default Login
