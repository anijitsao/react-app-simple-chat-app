import React from 'react';

// Constants
import Constants from '../Constants'

const RoomInfo = ({ roomName, lastMessage, dateInfo, senderId, userInfo, setSelectedRoomId, activeRoomId, roomId, onlineRooms, partnerId }) => {
  // instantiate the Constants
  const allConstants = new Constants()

  return (
    <div className={(activeRoomId == roomId) ? "room-info active-room" : "room-info"} onClick={setSelectedRoomId}>
      <div className="room-icon-div">
        <div className="room-initials">{roomName.substr(0, 2)}
          {(onlineRooms.indexOf(partnerId) > -1) ? <div className="online-mark"></div> : null}
        </div>
      </div>
      <div className="room-name">
        {roomName}
        <div className="last-message">{(userInfo == senderId) ? `You: ${lastMessage.substr(0, 96)}` : lastMessage.substr(0, 100)}</div>
      </div>
      <div className="date-info">{allConstants.formatDates(dateInfo)}</div>
    </div>
  );
};



export default RoomInfo;