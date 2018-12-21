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
      showRoomPanel: true
    }

    this.setSelectedRoomId = this.setSelectedRoomId.bind(this)

    // fill room info from Socket
    this.fillRoomInfoFromSocket = this.fillRoomInfoFromSocket.bind(this)
  }

  componentDidMount() {
    console.log('after press of backbutton')
    this.toggleMessagePanel(false, true)
  }

  componentDidUpdate() {
    console.log('did update', this.props)
    if (this.props.showBackButton == false) {
      console.log('Room panel sholud be shown')
      // this.setState({ showMessagePanel: false, showRoomPanel: true })
    }
  }

  toggleMessagePanel(showMessagePanel, showRoomPanel) {
    console.log('Control comes here', window.innerWidth)
    if (window.innerWidth < 500) {
      this.setState({ showMessagePanel, showRoomPanel }, () => {
        console.log('State is now ', this.state)
        if (this.state.showMessagePanel == true) {
          console.log('code reached')
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

  render() {

    let { userInfo } = this.props
    let { showMessagePanel, showRoomPanel, selectedRoomId, newMessageFromSocket } = this.state

    console.log('In render function of content', this.state)
    return (
      <div className="content">
        <RoomPanel
          showRoomPanel={showRoomPanel}
          userInfo={userInfo}
          newMessageFromSocket={newMessageFromSocket}
          setSelectedRoomId={this.setSelectedRoomId} />

        <MessagesPanel
          showMessagePanel={showMessagePanel}
          selectedRoomId={selectedRoomId}
          fillRoomInfoFromSocket={this.fillRoomInfoFromSocket}
          userInfo={userInfo} />
      </div>
    );
  }
};



export default Content;