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

// most important to serve static pages don't forget
// router.use(express.static('../dist'))

router.post('/login', (req, res) => {
	dbOps.connectDbAndRunQueries('login', req, res)
})


router.post('/getrooms/:id', (req, res) => {
	dbOps.connectDbAndRunQueries('getRooms', req, res)
})

router.get('/getconversation/:id', (req, res) => {
	dbOps.connectDbAndRunQueries('getConversation', req, res)
})


router.put('/updateroom', (req, res) => {
	dbOps.connectDbAndRunQueries('updateRoom', req, res)
})

router.put('/updateroomreadstatus', (req, res) => {
	dbOps.connectDbAndRunQueries('updateRoomReadStatus', req, res)
})

module.exports = router