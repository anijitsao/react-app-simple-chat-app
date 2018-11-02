import React from 'react';

const FriendInfo = ({ name, lastMessage, dateInfo }) => {
  return (
    <div className="friend-info">
  	  <div className="friend-icon-div">
  	    <img src="images/user_123.jpg" alt="logo of a friend"  className="friend-icon"/>
  	  </div>
	    <div className="friend-name">
	      {name}
	      <div className="last-message">{lastMessage}</div>
	    </div>
	    <div className="date-info">{dateInfo}</div>
	  </div>
  );
};



export default FriendInfo;