const express = require('express')

const app = express()
const PORT = 3000

let route = require('./routes')
app.use('/', route);


app.listen(PORT, () => {
	console.log('Server is listenning on ', PORT)
})