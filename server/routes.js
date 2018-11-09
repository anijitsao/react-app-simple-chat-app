// dependencies
const express = require('express')
const cors = require('cors')

const morgan = require('morgan')
const bodyParser = require('body-parser')


// local file dependencies
const dbOps = require('./dbOps')
let router = express.Router()

// middlewares
router.use(cors())
router.use(bodyParser.json({ type: 'application/json' }))
router.use(morgan('dev'))

router.get('/', (req, res) => {
	dbOps.connectDbAndRunQueries('welcome', req, res)

})

router.post('/login', (req, res) => {	
	dbOps.connectDbAndRunQueries('login', req, res)  
})


router.post('/getrooms/:id', (req, res) => {
	dbOps.connectDbAndRunQueries('getRooms', req, res)
})


module.exports = router