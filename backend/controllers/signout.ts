import express from 'express'

const signOutRouter = express.Router()

signOutRouter.get('/', (req, res) => {
    const cookie = ''
    res.cookie('matcha-token', cookie)
    res.cookie('matcha-cookie', cookie)
    res.status(200).json({ cookie });
})

export default signOutRouter
