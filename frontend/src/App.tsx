import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import SimpleReactLightbox from 'simple-react-lightbox'
import { makeStyles } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from './Theme'
import SignIn from './app/SignIn'
import CreateAccount from './app/CreateAccount'
import People from './app/People'
import Profile from './app/Profile'
import ForgotPassword from './app/ForgotPassword'
import NotFoundComponent from './app/NotFoundComponent'
import Header from './components/Header'
import Footer from './components/Footer'

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		height: '100vh',
	},
}))

const App = () => {
	const classes = useStyles()

	return (
		<>
			<BrowserRouter>
				<HelmetProvider>
					<Helmet>
						<meta charSet="utf-8" />
						<title>Matcha</title>
						<meta
							name="viewport"
							content="minimum-scale=1, initial-scale=1, width=device-width"
						/>
					</Helmet>
					<SimpleReactLightbox>
						<ThemeProvider theme={theme}>
							<CssBaseline />
							<div className={classes.root}>
								<Header />
								<div className="content">
									<Switch>
										<Route exact path="/" component={SignIn} />
										<Route path="/create" component={CreateAccount} />
										<Route path="/browse" component={People} />
										<Route path="/profile" component={Profile} />
										<Route path="/forgot" component={ForgotPassword} />
										<Route path="/404" component={NotFoundComponent} />
										<Route path="/" component={SignIn} />
										<Redirect from="/*" to="/404" />
									</Switch>
								</div>
								<Footer />
							</div>
						</ThemeProvider>
					</SimpleReactLightbox>
				</HelmetProvider>
			</BrowserRouter>
		</>
	)
}

export default App
