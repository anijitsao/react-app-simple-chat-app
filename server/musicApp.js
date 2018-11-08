const express = require('express')

const app = express()

let route = require('./musicRoutes')
app.use('/', route);


app.listen(3000, (req, res)=> {
	console.log('Server is listenning on ', 3000)
})