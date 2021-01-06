import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useCookies } from 'react-cookie'
import clearCookies from '../services/signOut'

const SignOut = () => {
	const history = useHistory()
	const [cookies, setCookie, removeCookie] = useCookies(['matcha-cookie'])

	const clear = async () => {
		await clearCookies()
		await removeCookie('matcha-cookie')
		await removeCookie('matcha-token')
		history.push('/')
	}

	useEffect(() => {
		clear()
	})

	return (
		<>
			<Helmet>
				<title>Sign Out</title>
			</Helmet>
		</>
	)
}

export default SignOut
