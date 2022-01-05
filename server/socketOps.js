// dependencies
import { connectDbAndRunQueries } from "./dbOps.js"

const allSocketOps = (io) => {
  let messagesToStoreInDb = []

  let activeUsers = []
  let users = {}

  io.sockets.on("connection", (socket) => {
    console.log("socket connection done successfully...", socket.id)

    socket.on("message", (data) => {
      console.log("data is inside socketOps", data)
      messagesToStoreInDb.push(data)

      // after 15 sec store all the messages in the DB
      setTimeout(() => {
        if (messagesToStoreInDb.length > 0) {
          console.log("15 sec crossed, we have some messages.. STORE IN DB...")
          let req = { body: messagesToStoreInDb }

          connectDbAndRunQueries("updateRoom", req)

          // reset the array
          messagesToStoreInDb = []
        }
      }, process.env.TIME_TO_WAIT_BEFORE_STORE_IN_DB)
      socket.broadcast.emit("message", data)
    })

    socket.on("disconnect", () => {
      console.log("socket disconnected...", socket.id)
      activeUsers = activeUsers.filter((activeUser) => {
        return users[socket.id] && activeUser != users[socket.id]["userId"]
      })

      // send to all except the sender
      socket.broadcast.emit("onlineUser", activeUsers)
    })

    socket.on("onlineUser", (data) => {
      console.log("data is", data)
      if (data) {
        users[socket.id] = { userId: data }

        if (activeUsers.indexOf(data) == -1) {
          activeUsers.push(data)
        }
      }

      // send to all clients including sender most important don't forget
      io.emit("onlineUser", activeUsers)
    })
  })
}
export { allSocketOps }
