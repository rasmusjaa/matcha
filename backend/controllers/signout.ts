import express from 'express'

const signOutRouter = express.Router()

signOutRouter.get('/', (req, res) => {
    console.log('logging out')
    const token = ''
    res.cookie('token', token, { httpOnly: true })
    res.status(200).json({ token });
})

export default signOutRouter
