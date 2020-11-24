import React from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
})

const SwipeableTemporaryDrawer = () => {
	const classes = useStyles()
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const toggleDrawer = (anchor: string, open: boolean) => () => {
		setState({ ...state, [anchor]: open })
	}

	const list = (anchor: string) => (
		<div
			className={classes.list}
			role="presentation"
			onClick={toggleDrawer(anchor, false)}
		>
			<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
			<Divider />
			<List>
				{['All mail', 'Trash', 'Spam'].map((text) => (
					<ListItem button key={text}>
						<ListItemText primary={text} />
					</ListItem>
				))}
			</List>
		</div>
	)

	return (
		<div>
			<React.Fragment key="rightmenu">
				<Button onClick={toggleDrawer('right', true)}>MENU</Button>
				<SwipeableDrawer
					anchor="right"
					open={state.right}
					onClose={toggleDrawer('right', false)}
					onOpen={toggleDrawer('right', true)}
				>
					{list('right')}
				</SwipeableDrawer>
			</React.Fragment>
		</div>
	)
}

const Header = () => {
	return (
		<div>
			<SwipeableTemporaryDrawer />
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
					<NavLink to="/profile">Profile</NavLink>
				</li>
				<li>
					<NavLink to="/404">404</NavLink>
				</li>
			</ul>
		</div>
	)
}

export default Header
