const express = require('express')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)



const PORT = 3000

let route = require('./routes')

// most important to serve static pages don't forget
app.use(express.static('../dist'))

// for other APIs 
app.use('/services', route);

// socket related events
const socketOps = require('./socketOps')
socketOps.allSocketOps(io)


// listen
server.listen(PORT, () => {
  console.log('Server is listenning on ', PORT)
})

