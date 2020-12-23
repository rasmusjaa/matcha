const errorHandler = (error: any, request: any, response: any, next: Function) => {
	console.log('error name: ', error.name)
    
	if (error.name === 'JsonWebTokenError') {
        return response.status(401).json({ error: error.message })
    }
    if (error.name === 'TokenExpiredError') {
        return response.status(401).json({ error: error.message })
	}

	next(error)
}

export {
	errorHandler
}
