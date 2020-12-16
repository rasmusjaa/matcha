import React, { useState } from 'react'
import axios from 'axios'

const signIn = (formdata: { userName: string; password: string }) => {
	const storedJwt = localStorage.getItem('token')
	console.log(storedJwt)

	axios
		.post('http://localhost:3001/signin', formdata)
		.then((response) => {
			if (response.status === 200) {
				console.log(response.data.token)
				localStorage.setItem('token', response.data.token)
				console.log('stored: ', storedJwt)
			}
		})
		.catch((error) => {
			console.log('err: ', error) // remove
		})
}

export default signIn
