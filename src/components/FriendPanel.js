import React, { Component } from 'react';

// components
import FriendInfo from './FriendInfo'

class FriendPanel extends Component {
  // static propTypes = {
  //     className: PropTypes.string,
  // };

  constructor(props) {
    super(props);

    this.state = {
      friends: [{
          name: 'Ajitesh',
          id: 'adejhq876',
          lastMessage: 'When are you going there ? ?? ',
          dateInfo: '4:32 PM',
          senderId: 'adejhq876'
        },
        {
          name: 'Bideshini Pakhira',
          id: 'adejhq87276',
          lastMessage: 'I enjoyed the barbeque Yesterday',
          dateInfo: 'Yesterday',
          senderId: 'anijit123'
        },
        {
          name: 'Jeet',
          id: 'adejhq876m2',
          lastMessage: 'I am joing the party soon',
          dateInfo: 'Thursday',
          senderId: 'anijit123'
        },
        {
          name: 'Sumitabha Sir',
          id: 'adejhq87xfr',
          lastMessage: 'Today is master class for node js',
          dateInfo: 'Wednesday',
          senderId: 'adejhq87xfr'
        },
        {
          name: 'Priyanka Majhi',
          id: 'padejhq876',
          lastMessage: 'I got the latest notes for Git ... ',
          dateInfo: '12/09/2018',
          senderId: 'padejhq876'
        },
      ]
    }
  }

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