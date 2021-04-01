import { useEffect, useState } from 'react';
import axios from 'axios';

// components
import RoomInfo from './RoomInfo'
import Loading from '../Loading'

// Constants
import Constants from '../Constants'

const RoomPanel = (props) => {
  // Initialize the initial state and its modifier function
  const [roomPanelData, setRoomPanelData] = useState(
    {
      rooms: [],
      showLoading: true
    })

  // instantiate the Constants
  const allConstants = Constants()

  useEffect(() => {
    loadrooms()
  }, [])

  // componentWillReceiveProps(nextProps) {
  //   // console.log('nextProps from RoomPanel', nextProps, ' and old props', props)

  //   if (nextProps.newMessageFromSocket && (!props.newMessageFromSocket || nextProps.newMessageFromSocket.id !== props.newMessageFromSocket.id)) {

  //     let newRooms = [...state.rooms]

  //     newRooms.forEach((room) => {
  //       if (room.roomId == nextProps.newMessageFromSocket.roomId) {

  //         // adjust the necessary field if the roomId matches
  //         room.lastMessage = nextProps.newMessageFromSocket.msgBody
  //         room.dateInfo = nextProps.newMessageFromSocket.timeSent
  //         room.senderId = nextProps.newMessageFromSocket.senderId

  //         // if the message is from other non active room
  //         if (room.read == true) {
  //           room.read = false
  //           saveReadStatusToDb(room, false)
  //         }
  //       }
  //     })

  //     newRooms = newRooms.sort((a, b) => { return new Date(b.dateInfo) - new Date(a.dateInfo) })
  //     setState({ rooms: newRooms })
  //   }
  // }

  const loadrooms = () => {
    // call the back end to get rooms
    axios({
      method: allConstants.method.POST,
      url: allConstants.getRooms.replace('{id}', props.userInfo.userId),
      header: allConstants.header,
      data: { rooms: props.userInfo.rooms }
    })
      .then((res) => {
        // fill the rooms array from the response
        console.log('data', res.data)

        // sort the data
        res.data = res.data.sort((a, b) => { return new Date(b.dateInfo) - new Date(a.dateInfo) })

        // set necessary state variables 
        setRoomPanelData({ ...roomPanelData, rooms: res.data, showLoading: false })
      })
  }


  const setSelectedRoomId = (id) => {
    // pass the selected room id augmented with logged in userid to the parent 
    props.setSelectedRoomId(id)

    // set active room id for highlighting purpose
    setRoomPanelData({ ...roomPanelData, activeRoomId: id })
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
      await axios({
        method: allConstants.method.PUT,
        url: allConstants.saveReadStatus,
        data: {
          userId: props.userInfo.userId,
          roomName: room.roomName,
          read: status
        }
      })
    } catch (err) {
      console.log('unable to save room status', err)
    }
  }

  const { userInfo, showRoomPanel, onlineRooms } = props
  const { activeRoomId, showLoading, rooms } = roomPanelData

  const roomStyle = (showRoomPanel == false) ? "rooms-panel hide-div" : "rooms-panel"
  return (
    <div className={roomStyle}>
      {(showLoading == true) ? <Loading />
        :
        rooms.map((room) => {
          return <RoomInfo key={room.roomId} {...room}
            userInfo={userInfo.userId}
            activeRoomId={activeRoomId}
            onlineRooms={onlineRooms}
            setSelectedRoomId={() => setSelectedRoomId(room.roomId)} />
        })
      }
    </div>
  );
}

export default RoomPanel;
