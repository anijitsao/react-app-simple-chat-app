// dependencies
const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
const bodyParser = require('body-parser')


// local file dependencies
const dbOps = require('./musicdbOps')
let router = express.Router()

// middlewares
router.use(cors())
router.use(bodyParser.json({ type: 'application/json' }))
router.use(morgan('dev'))

router.get('/getsongs', (req, res) => {
	console.log('route reached...')
	dbOps.connectDbAndRunQueries('getSongs', req, res)
})

// router.post('/login', (req, res) => {	
// 	dbOps.connectDbAndRunQueries('login', req, res)  
// })


// router.get('/getrooms/:id', (req, res) => {
// 	dbOps.connectDbAndRunQueries('getRooms', req, res)
// })


module.exports = router