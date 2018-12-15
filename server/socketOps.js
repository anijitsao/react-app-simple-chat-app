// dependencies
const dbOps = require('./dbOps')

const TIME_TO_WAIT_BEFORE_STORE_IN_DB = 15000

const allSocketOps = (io) => {

  let messagesToStoreInDb = []

  io.on('connection', (socket) => {
    console.log('socket connection done successfully...')


    socket.on('message', (data) => {
      console.log('data is inside socketOps', data)
      messagesToStoreInDb.push(data)

      // after 15 sec store all the messages in the DB
      setTimeout(() => {
        if (messagesToStoreInDb.length > 0) {

          console.log('15 sec crossed, we have some messages.. STORE IN DB...')
          let req = { body: messagesToStoreInDb }

          dbOps.connectDbAndRunQueries('updateRoom', req)

          // reset the array
          messagesToStoreInDb = []
        }
      }, TIME_TO_WAIT_BEFORE_STORE_IN_DB)
      socket.broadcast.emit('message', data)
    });



    socket.on('disconnect', () => {
      console.log('socket disconnected...')
    });
  });

}
module.exports = {
  allSocketOps
}