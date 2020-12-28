import React, { useReducer, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import Copyright from '../components/Copyright'

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

const ForgotPassword = () => {
	const classes = useStyles()
	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		if (state.username.trim() && state.password.trim()) {
			dispatch({
				type: 'setIsButtonDisabled',
				payload: false,
			})
		} else {
			dispatch({
				type: 'setIsButtonDisabled',
				payload: true,
			})
		}
	}, [state.username, state.password])

	const handleLogin = () => {
		if (state.username === 'abc@email.com' && state.password === 'password') {
			dispatch({
				type: 'loginSuccess',
				payload: 'Login Successfully',
			})
		} else {
			dispatch({
				type: 'loginFailed',
				payload: 'Incorrect username or password',
			})
		}
	}

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.keyCode === 13 || event.which === 13) {
			handleLogin()
		}
	}

	const handleUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		dispatch({
			type: 'setUsername',
			payload: event.target.value,
		})
	}

	const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
		event
	) => {
		dispatch({
			type: 'setPassword',
			payload: event.target.value,
		})
	}

	return (
		<>
			<Helmet>
				<title>Forgot Password</title>
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
								Reset password
							</Typography>
							<form className={classes.form} noValidate>
								<TextField
									error={state.isError}
									fullWidth
									id="username"
									type="email"
									label="Email Address"
									variant="outlined"
									margin="normal"
									required
									name="email"
									autoComplete="email"
									autoFocus
									onChange={handleUsernameChange}
									onKeyPress={handleKeyPress}
								/>
								<TextField
									error={state.isError}
									fullWidth
									id="password"
									type="password"
									label="Username"
									variant="outlined"
									margin="normal"
									required
									name="password"
									autoComplete="current-password"
									helperText={state.helperText}
									onChange={handlePasswordChange}
									onKeyPress={handleKeyPress}
								/>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
									onClick={handleLogin}
									disabled={state.isButtonDisabled}
								>
									Send
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href="#test" variant="body2">
											Help
										</Link>
									</Grid>
									<Grid item>
										<Link href="/create" variant="body2">
											Sign Up
										</Link>
									</Grid>
								</Grid>
								<Box mt={5}>
									<Copyright />
								</Box>
							</form>
						</div>
					</Grid>
				</Grid>
			</main>
		</>
	)
}

export default ForgotPassword
