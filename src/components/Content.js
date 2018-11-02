import React from 'react';

// components
import FriendPanel from './FriendPanel' 
import MessagesPanel from './MessagesPanel'

const Content = () => {
  return (
    <div className="content">
      <FriendPanel />
      <MessagesPanel />                            
    </div>
  );
};



export default Content;