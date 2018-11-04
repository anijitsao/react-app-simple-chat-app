import React, { Component } from 'react';

// components
import FriendPanel from './friends/FriendPanel'
import MessagesPanel from './conversation/MessagesPanel'

class Content extends Component {
  // if (window.innerWidth < 680) {
  //   showMessagePanel = false
  // }

  constructor(props) {
    super(props);

    this.state = {
      showMessagePanel: true,
      // selectedFriendId: '1234'
    }

    this.setSelectedFriendId = this.setSelectedFriendId.bind(this)
  }

  setSelectedFriendId(id) {
    console.log('id here in Content', id)

    // set in the corresponding variable
    this.setState({ selectedFriendId: id, showMessagePanel: true }, () => {
      console.log('state is now', this.state)
    })
  }

  render() {

    let { userInfo } = this.props
    let { showMessagePanel, selectedFriendId } = this.state

    return (
      <div className="content">
      <FriendPanel userInfo={userInfo} setSelectedFriendId={this.setSelectedFriendId}/>
      
      {(showMessagePanel) ? <MessagesPanel selectedFriendId={this.state.selectedFriendId}/>: ''}
      
    </div>
    );
  }
};



export default Content;