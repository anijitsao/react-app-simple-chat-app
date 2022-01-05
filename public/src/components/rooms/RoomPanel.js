import { useEffect, useState } from "react"

// components
import RoomInfo from "./RoomInfo"
import Loading from "../Loading"

// Constants
import Constants from "../Constants"
import { connectBackend } from "../connectBackend"

const RoomPanel = (props) => {
  // Initialize the initial state and its modifier function
  const [roomPanelData, setRoomPanelData] = useState({
    rooms: [],
    showLoading: true,
  })
  const [lastMsgFromSocketId, setLastMsgFromSocketId] = useState("")
  const [shouldLoadrooms, setShouldLoadRooms] = useState(true)
  const [activeRoomId, setActiveRoomId] = useState(props.selectedRoomId)
  // instantiate the Constants
  const allConstants = Constants()

  useEffect(() => {
    loadrooms()
    onMessageArrival()
  })

  const onMessageArrival = () => {
    if (
      props.newMessageFromSocket &&
      props.newMessageFromSocket.id !== lastMsgFromSocketId
    ) {
      const { roomId, msgBody, timeSent, senderId, id } =
        props.newMessageFromSocket
      console.log(
        "props is here",
        id,
        " and roomPanelData",
        lastMsgFromSocketId
      )

      // avoid repeated loading of rooms and save the last message id from socket
      setShouldLoadRooms(false)
      setLastMsgFromSocketId(id)

      roomPanelData.rooms.map((room) => {
        if (room.roomId == roomId) {
          // adjust the necessary field if the roomId matches
          room.lastMessage = msgBody
          room.dateInfo = timeSent
          room.senderId = senderId

          // if the message is from other non active room
          if (room.read == true && room.roomId !== activeRoomId) {
            room.read = false
            saveReadStatusToDb(room, false)
          }
        }
      })

      roomPanelData.rooms.sort((a, b) => {
        return new Date(b.dateInfo) - new Date(a.dateInfo)
      })
    }
  }

  // call the back end to get rooms
  const loadrooms = async () => {
    if (shouldLoadrooms == true) {
      try {
        const config = {
          method: allConstants.method.POST,
          url: allConstants.getRooms.replace("{id}", props.userInfo.userId),
          header: allConstants.header,
          data: { rooms: props.userInfo.rooms },
        }

        const res = await connectBackend(config)

        // sort the data based on dates
        res.data = res.data.sort((a, b) => {
          return new Date(b.dateInfo) - new Date(a.dateInfo)
        })

        // set necessary state variables
        setRoomPanelData((prevState) => {
          return { ...prevState, rooms: res.data, showLoading: false }
        })
        setShouldLoadRooms(false)
      } catch (err) {
        console.log("some error occurred....", err)
      }
    }
  }
  // pass the selected room id augmented with logged in userid to the parent
  const setSelectedRoomId = (id) => {
    props.setSelectedRoomId(id)
    // set active room id for highlighting purpose
    setActiveRoomId(id)
    changeReadStatus(id)
  }

  // function to change the room status from read / unread
  const changeReadStatus = (id) => {
    const allRooms = [...roomPanelData.rooms]

    allRooms.forEach((room, index, roomArray) => {
      if (room.roomId == id && room.read == false) {
        roomArray[index].read = true
        saveReadStatusToDb(room, true)
      }
    })

    setRoomPanelData({ ...roomPanelData, rooms: allRooms })
  }

  const saveReadStatusToDb = async (room, status) => {
    try {
      const config = {
        method: allConstants.method.PUT,
        url: allConstants.saveReadStatus,
        data: {
          userId: props.userInfo.userId,
          roomName: room.roomName,
          read: status,
        },
      }
      await connectBackend(config)
    } catch (err) {
      console.log("unable to save room status", err)
    }
  }

  const { userInfo, showRoomPanel, onlineRooms } = props
  const { showLoading, rooms } = roomPanelData

  const roomStyle =
    showRoomPanel == false ? "rooms-panel hide-div" : "rooms-panel"
  return (
    <div className={roomStyle}>
      {showLoading == true ? (
        <Loading />
      ) : (
        rooms.map((room) => {
          return (
            <RoomInfo
              key={room.roomId}
              {...room}
              userInfo={userInfo.userId}
              activeRoomId={activeRoomId}
              onlineRooms={onlineRooms}
              setSelectedRoomId={setSelectedRoomId}
            />
          )
        })
      )}
    </div>
  )
}

export default RoomPanel
