import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, BrowserRouter, Redirect, Switch } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/core'
import theme from './Theme'
import SignInSide from './components/SignInSide'
import CreateAccount from './components/CreateAccount'
import People from './components/People'
import Profile from './components/Profile'
import NotFoundComponent from './components/NotFoundComponent'
import Header from './components/Header'

const Footer = () => {
	return (
		<div>
			<p>footeri</p>
		</div>
	)
}

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Helmet>
					<meta charSet="utf-8" />
					<title>Matcha</title>
					<meta
						name="viewport"
						content="minimum-scale=1, initial-scale=1, width=device-width"
					/>
				</Helmet>
				<ThemeProvider theme={theme}>
					<Header />
					<div className="content">
						<Switch>
							<Route exact path="/" component={SignInSide} />
							<Route path="/create" component={CreateAccount} />
							<Route path="/browse" component={People} />
							<Route path="/profile" component={Profile} />
							<Route path="/404" component={NotFoundComponent} />
							<Redirect from="/*" to="/404" />
						</Switch>
					</div>
					<Footer />
				</ThemeProvider>
			</BrowserRouter>
		</>
	)
}

export default App
