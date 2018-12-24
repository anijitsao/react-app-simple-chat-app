import React, { Component } from 'react';
import axios from 'axios';

// components
import RoomInfo from './RoomInfo'
import Loading from '../Loading'

// Constants
import Constants from '../Constants'

class RoomPanel extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      showLoading: true
    }

    // instantiate the Constants
    this.allConstants = new Constants()
  }

  componentDidMount() {
    this.loadrooms()
  }

  componentWillReceiveProps(nextProps) {
    // console.log('nextProps from RoomPanel', nextProps, ' and old props', this.props)

    if (nextProps.newMessageFromSocket && (!this.props.newMessageFromSocket || nextProps.newMessageFromSocket.id !== this.props.newMessageFromSocket.id)) {

      let newRooms = [...this.state.rooms]

      newRooms.forEach((room) => {
        if (room.roomId == nextProps.newMessageFromSocket.roomId) {

          // adjust the necessary field if the roomId matches
          room.lastMessage = nextProps.newMessageFromSocket.msgBody
          room.dateInfo = nextProps.newMessageFromSocket.timeSent
          room.senderId = nextProps.newMessageFromSocket.senderId
          
          // if the message is from other non active room
          if(room.read == true) {
            room.read = false
            this.saveReadStatusToDb(room, false)
          }
        }
      })

      newRooms = newRooms.sort((a, b) => { return new Date(b.dateInfo) - new Date(a.dateInfo) })
      this.setState({ rooms: newRooms })
    }
  }

  loadrooms() {
    let allConstants = this.allConstants
    // console.log('All Constants', allConstants)

    // call the back end to get rooms
    axios({
      method: allConstants.method.POST,
      url: allConstants.getRooms.replace('{id}', this.props.userInfo.userId),
      header: allConstants.header,
      data: { rooms: this.props.userInfo.rooms }
    })
      .then((res) => {
        // fill the rooms array from the response
        console.log('data', res.data)

        // sort the data
        res.data = res.data.sort((a, b) => { return new Date(b.dateInfo) - new Date(a.dateInfo) })

        // let selectRoomIdFromResponse = res.data[0]['roomId']

        // set necessary state variables 
        this.setState({ rooms: res.data, showLoading: false })

        // this.setSelectedRoomId(selectRoomIdFromResponse)
      })
  }


  setSelectedRoomId(id) {
    // pass the selected room id augmented with logged in userid to the parent 
    this.props.setSelectedRoomId(id)

    // set active room id for highlighting purpose
    this.setState({ activeRoomId: id })
    this.changeReadStatus(id)
  }

  // function to change the room status from read / unread
  changeReadStatus(id) {
    let allRooms = [...this.state.rooms]
    console.log('change status reached')
    
    allRooms.forEach((room, index, roomArray) => {
      if (room.roomId == id && room.read == false) {
        roomArray[index].read = true      
        this.saveReadStatusToDb(room, true)
      }
    })

    console.log('All rooms are now', allRooms)
    this.setState({ rooms: allRooms })
  }

  saveReadStatusToDb(room, status) {
    axios({
      method: this.allConstants.method.PUT,
      url: this.allConstants.saveReadStatus,
      data: {
        userId: this.props.userInfo.userId,
        roomName: room.roomName,
        read: status
      }
    })
    .then((response)=> {
      console.log('room status saved')
    })
    .catch((err)=>{
      console.log('unable to save room status', err)
    })
  }

  render() {
    let { userInfo, showRoomPanel, onlineRooms } = this.props
    let { activeRoomId, showLoading } = this.state

    let roomStyle = (showRoomPanel == false) ? "rooms-panel hide-div" : "rooms-panel"
    return (
      <div className={roomStyle}>
        {(showLoading == true) ? <Loading />
          :
          this.state.rooms.map((room) => {
            return <RoomInfo key={room.roomId} {...room}
              userInfo={userInfo.userId}
              activeRoomId={activeRoomId}
              onlineRooms={onlineRooms}
              setSelectedRoomId={this.setSelectedRoomId.bind(this, room.roomId)} />
          })
        }
      </div>
    );
  }
}


export default RoomPanel;