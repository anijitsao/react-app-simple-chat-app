const http = require('http')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')

// static JSON files 
const userList = require('./userList.json')
const rooms = require('./rooms.json')
const messages = require('./messages.json')
console.log('rooms', messages)


// middlewares
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))
app.use(morgan('dev'))


// routes
app.get('/', (req, res) => {
  res.send('Welcome')
})


app.post('/login', (req, res) => {
  console.log('req ', req.body)
  let output = {}

  if (userList[req.body.username] && userList[req.body.username]['password'] == req.body.password) {
    let { username, name, userId } = userList[req.body.username]

    output = { username, name, userId }
    console.log('User matched', output)
  } else {
    output = { message: 'Failed to find the user' }
  }
  res.json(output)
})


app.get('/getrooms/:id', (req, res) => {
  console.log('params', req.params)

  res.json(rooms['anijit'])
})


// conversation api
app.get('/getconversation/:id', (req, res) => {
  console.log('params for conversation', req.params)


  let output = messages[req.params.id] || []
  res.json(output)
})

// socket related events
var chat = io.on('connection', (socket) => {
  console.log('socket connection done successfully...')


  socket.on('message', (data) => {
    console.log('data is', data)
    socket.broadcast.emit('message', data)
  });



  socket.on('disconnect', () => {
    console.log('socket disconnected...')
  });
});




// listen
server.listen(3000, () => {
  console.log('server is listening on 3000')
});