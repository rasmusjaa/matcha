import React from 'react'
import { Helmet } from 'react-helmet'
import {
	Route,
	BrowserRouter,
	Redirect,
	Switch,
	NavLink,
} from 'react-router-dom'
import SignInSide from './components/SignInSide'
import CreateAccount from './components/CreateAccount'
import People from './components/People'
import NotFoundComponent from './components/NotFoundComponent'

const Header = () => {
	return (
		<div>
			<ul className="header">
				<li>
					<NavLink to="/">Sign In</NavLink>
				</li>
				<li>
					<NavLink to="/create">Create account</NavLink>
				</li>
				<li>
					<NavLink to="/browse">Browse</NavLink>
				</li>
				<li>
					<NavLink to="/404">404</NavLink>
				</li>
			</ul>
		</div>
	)
}

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
				<Header />
				<div className="content">
					<Switch>
						<Route exact path="/" component={SignInSide} />
						<Route path="/create" component={CreateAccount} />
						<Route path="/browse" component={People} />
						<Route path="/404" component={NotFoundComponent} />
						<Redirect from="/*" to="/404" />
					</Switch>
				</div>
				<Footer />
			</BrowserRouter>
		</>
	)
}

export default App
