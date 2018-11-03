const http = require('http')
const express = require('express')
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

const bodyParser = require('body-parser')

// static JSON files 
const userList = require('./userList.json')
const friends = require('./friends.json')
console.log('friends', friends)


// middlewares
app.use(cors())
app.use(bodyParser.json({ type: 'application/json' }))

app.get('/', (req, res) => {
  res.send('Welcome')
})


// routes
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


app.get('http:localhost:3000/friends/:anijit123', (req, res)=>{
	console.log('params', req.params)

	res.json(friends['anijit'])
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