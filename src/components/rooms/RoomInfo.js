import React from 'react';

// Constants
import Constants from '../Constants'

const RoomInfo = ({ roomName, lastMessage, dateInfo, senderId, userInfo, onClick, activeRoomId, roomId }) => {

  // instantiate the Constants
  const allConstants = new Constants()
  return (
    <div className={(activeRoomId == roomId) ? "room-info active-room" : "room-info"} onClick={onClick}>
      <div className="room-icon-div">
        <img src="images/user_123.jpg" alt="logo of a room"  className="room-icon"/>
      </div>
      <div className="room-name">
        {roomName}
        <div className="last-message">{(userInfo == senderId) ? `You: ${lastMessage.substr(0, 96)}`: lastMessage.substr(0, 100)}</div>
      </div>
      <div className="date-info">{allConstants.formatDates(dateInfo)}</div>
    </div>
  );
};



export default RoomInfo;