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
      // selectedRoomId: '1234'
    }

    this.setSelectedRoomId = this.setSelectedRoomId.bind(this)

    // fill room info from Socket
    this.fillRoomInfoFromSocket = this.fillRoomInfoFromSocket.bind(this)

  }

  setSelectedRoomId(id) {
    console.log('id here in Content', id)

    // set in the corresponding variable
    this.setState({ selectedRoomId: id, showMessagePanel: true }, () => {
      console.log('state is now', this.state)
    })
  }

  fillRoomInfoFromSocket(message) {
    console.log('The new message from Socket arrived', message)

    this.setState({ newMessageFromSocket: message })
  }

  render() {

    let { userInfo } = this.props
    let { showMessagePanel, selectedRoomId, newMessageFromSocket } = this.state

    return (
      <div className="content">
      <RoomPanel 
      userInfo={userInfo} 
      newMessageFromSocket={newMessageFromSocket}
      setSelectedRoomId={this.setSelectedRoomId}/>
      
      { (showMessagePanel) ? 
        
        <MessagesPanel 
        selectedRoomId={this.state.selectedRoomId} 
        fillRoomInfoFromSocket={this.fillRoomInfoFromSocket}
        userInfo={userInfo}/>
        : 
        ''
      }
      
    </div>
    );
  }
};



export default Content;