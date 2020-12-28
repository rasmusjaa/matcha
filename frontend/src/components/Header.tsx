import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet-async'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import MenuItem from '@material-ui/core/MenuItem'
import Badge from '@material-ui/core/Badge'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
import AccountCircle from '@material-ui/icons/AccountCircle'

const useStyles = makeStyles((Theme) => ({
	list: {
		width: 250,
	},
	fullList: {
		width: 'auto',
	},
	menuItem: {
		color: Theme.palette.primary.main,
		textDecoration: 'none',
	},
	menuButton: {
		padding: Theme.spacing(1),
	},
	menuTitle: {
		padding: Theme.spacing(1),
	},
	menuRight: {
		marginLeft: '0',
		'&:first-of-type': {
			marginLeft: 'auto',
		},
	},
}))

interface TitleParams {
	title: string
}

const TitleAnnouncer = () => {
	const [title, setTitle] = useState<string>('')
	const onHelmetChange = (newTitle: TitleParams) => {
		setTitle(newTitle.title)
	}
	return (
		<>
			<Typography variant="h5" component="p">
				{title}
			</Typography>
			<Helmet onChangeClientState={onHelmetChange} />
		</>
	)
}

const Header = () => {
	const classes = useStyles()
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	})

	const menuItems = [
		{
			name: 'Sign in',
			url: '/',
		},
		{
			name: 'Create account',
			url: '/create',
		},
		{
			name: 'Browse',
			url: '/browse',
		},
		{
			name: 'Profile',
			url: '/profile',
		},
		{
			name: '404',
			url: '/404',
		},
		{
			name: 'Sign out',
			url: '/?logout=true',
		},
	]

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
				{menuItems.map((item) => (
					<NavLink key={item.name} to={item.url} className={classes.menuItem}>
						<ListItem button key={item.url}>
							<ListItemText primary={item.name} />
						</ListItem>
					</NavLink>
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
		<AppBar position="sticky">
			<Toolbar>
				<React.Fragment key="rightmenu">
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="menu"
						onClick={toggleDrawer('left', true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.menuTitle}>
						<TitleAnnouncer />
					</Typography>
					<MenuItem className={classes.menuRight}>
						<IconButton color="inherit">
							<Badge badgeContent={4} color="secondary">
								<MailIcon />
							</Badge>
						</IconButton>
					</MenuItem>
					<MenuItem className={classes.menuRight}>
						<IconButton color="inherit">
							<Badge badgeContent={999} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
					</MenuItem>
					<MenuItem className={classes.menuRight}>
						<IconButton color="inherit">
							<AccountCircle />
						</IconButton>
					</MenuItem>
					<SwipeableDrawer
						anchor="left"
						open={state.left}
						onClose={toggleDrawer('left', false)}
						onOpen={toggleDrawer('left', true)}
					>
						{list('left')}
					</SwipeableDrawer>
				</React.Fragment>
			</Toolbar>
		</AppBar>
	)
}

export default Header
