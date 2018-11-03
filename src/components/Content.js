import React from 'react';

// components
import FriendPanel from './FriendPanel'
import MessagesPanel from './MessagesPanel'

const Content = () => {
  let showMessagePanel = true
  if (window.innerWidth < 680) {
    showMessagePanel = false
  }

  return (
    <div className="content">
      <FriendPanel />
      
      {(showMessagePanel) ? <MessagesPanel />: ''}
      
    </div>
  );
};



export default Content;