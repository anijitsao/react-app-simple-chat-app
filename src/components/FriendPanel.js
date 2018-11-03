import React, { Component } from 'react';
import axios from 'axios';

// components
import FriendInfo from './FriendInfo'

class FriendPanel extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }
  }

  loadFriends() {
    axios({
        method: 'GET',
        url: 'http:localhost:3000/friends/:anijit123',
        header: { 'Content-Type': 'application/json' }
      })
      .then((res) => {
        // fill the friends array from the response
        console.log('data', res.data)
        this.setState({ friends: res.data })
      })
  }

  this.loadFriends()
  render() {
    return (
      <div className="friends-panel">
      {
        this.state.friends.map((friend)=> {
          return <FriendInfo key={friend.id} {...friend} />
        })
      }
      </div>
    );
  }
}

export default FriendPanel;