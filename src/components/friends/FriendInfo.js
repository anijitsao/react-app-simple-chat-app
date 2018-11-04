import React from 'react';

const FriendInfo = ({ name, lastMessage, dateInfo, senderId, userInfo, onClick }) => {
  // console.log('Onclick handler', setSelectedFriendId)
  // console.log('props', props)

  return (
    <div className="friend-info" onClick={onClick}>
  	  <div className="friend-icon-div">
  	    <img src="images/user_123.jpg" alt="logo of a friend"  className="friend-icon"/>
  	  </div>
	    <div className="friend-name">
	      {name}
	      <div className="last-message">{(userInfo == senderId) ? `You:${lastMessage}`: lastMessage}</div>
	    </div>
	    <div className="date-info">{dateInfo}</div>
	  </div>
  );
};



export default FriendInfo;