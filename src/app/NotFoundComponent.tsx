import React from 'react'
import { Helmet } from 'react-helmet-async'

const NotFoundComponent = () => {
	return (
		<>
			<Helmet>
				<title>Profile</title>
			</Helmet>
			<main>
				<div>
					<p>LOL, page does not exist</p>
				</div>
			</main>
		</>
	)
}

export default NotFoundComponent
