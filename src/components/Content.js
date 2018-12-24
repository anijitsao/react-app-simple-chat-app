import React, { Component } from 'react';

// components
import RoomPanel from './rooms/RoomPanel'
import MessagesPanel from './conversation/MessagesPanel'

class Content extends Component {
  // if (window.innerWidth < 680) {
  //   showMessagePanel = false
  // }

  constructor(props) {
    super(props);

    this.state = {
      showMessagePanel: true,
      showRoomPanel: true,
      onlineRooms: []
    }

    this.setSelectedRoomId = this.setSelectedRoomId.bind(this)

    // fill room info from Socket
    this.fillRoomInfoFromSocket = this.fillRoomInfoFromSocket.bind(this)
    this.notifyOnlineRooms = this.notifyOnlineRooms.bind(this)
  }

  componentDidMount() {
    this.toggleMessagePanel(false, true)
  }  

  toggleMessagePanel(showMessagePanel, showRoomPanel) {
    if (window.innerWidth < 500) {
      this.setState({ showMessagePanel, showRoomPanel }, () => {
        if (this.state.showMessagePanel == true) {
          this.props.toggleBackButton(true)
        }
      })
    }
  }

  setSelectedRoomId(id) {
    console.log('id here in Content', id)
    this.toggleMessagePanel(true, false)
    // set in the corresponding variable
    this.setState({ selectedRoomId: id }, () => {
      console.log('state is now', this.state)
    })
  }

  fillRoomInfoFromSocket(message) {
    console.log('The new message from Socket arrived', message)

    this.setState({ newMessageFromSocket: message })
  }

  notifyOnlineRooms(rooms) {
    this.setState({onlineRooms: rooms})
  }
  render() {

    let { userInfo } = this.props
    let { showMessagePanel, showRoomPanel, selectedRoomId, newMessageFromSocket, onlineRooms } = this.state

    if (window.innerWidth < 500 && this.props.showBackButton == false) {
      showMessagePanel = false
      showRoomPanel = true
    }

    return (
      <div className="content">
        <RoomPanel
          showRoomPanel={showRoomPanel}
          userInfo={userInfo}
          onlineRooms={onlineRooms}
          newMessageFromSocket={newMessageFromSocket}
          setSelectedRoomId={this.setSelectedRoomId} />

        <MessagesPanel
          showMessagePanel={showMessagePanel}
          selectedRoomId={selectedRoomId}
          fillRoomInfoFromSocket={this.fillRoomInfoFromSocket}
          notifyOnlineRooms={this.notifyOnlineRooms}
          userInfo={userInfo} />
      </div>
    );
  }
};



export default Content;