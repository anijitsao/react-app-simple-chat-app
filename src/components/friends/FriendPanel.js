import React, { Component } from 'react';
import axios from 'axios';

// components
import FriendInfo from './FriendInfo'

// Constants
import Constants from '../Constants'

class FriendPanel extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }

    // instantiate the Constants
    this.allConstants = new Constants()
  }

  componentDidMount() {
    this.loadFriends()
  }


  loadFriends() {
    let allConstants = this.allConstants

    axios({
        method: allConstants.method.GET,
        url: allConstants.friends.replace('{id}', 'anijit123'),
        header: allConstants.header
      })
      .then((res) => {
        // fill the friends array from the response
        console.log('data', res.data)
        this.setState({ friends: res.data })

        let selectFriendIdFromResponse = (res.data[0]['senderId'] !== this.props.userInfo.userId) ? res.data[0]['senderId'] : res.data[0]['receiverId']
        this.setSelectedFriendId(`${this.props.userInfo.userId}-${selectFriendIdFromResponse}`)
      })
  }


  setSelectedFriendId(id) {
    id = (id.indexOf(this.props.userInfo.userId) > -1) ? id : `${this.props.userInfo.userId}-${id}`
    // console.log('id here', id)

    // pass the selected friend id augmented with logged in userid to the parent 
    this.props.setSelectedFriendId(id)
  }

  render() {
    let {userInfo} = this.props
    return (
      <div className="friends-panel">
      {
        this.state.friends.map((friend)=> {
          return <FriendInfo key={friend.id} {...friend} 
          userInfo={userInfo.userId}
          onClick={this.setSelectedFriendId.bind(this, friend.id)}/>
        })
      }
      </div>
    );
  }
}


export default FriendPanel;