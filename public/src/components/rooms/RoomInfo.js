// Constants
import Constants from "../Constants"

const RoomInfo = ({
  roomName,
  lastMessage,
  dateInfo,
  senderId,
  userInfo,
  setSelectedRoomId,
  activeRoomId,
  roomId,
  onlineRooms,
  partnerId,
  read,
}) => {
  // instantiate the Constants
  const allConstants = Constants()
  const readStyle = read == false ? "last-message unread-msg" : "last-message"
  return (
    <div
      className={activeRoomId == roomId ? "room-info active-room" : "room-info"}
      onClick={() => setSelectedRoomId(roomId)}
    >
      <div className="room-icon-div">
        <div className="room-initials">
          {roomName.substr(0, 2)}
          {onlineRooms.includes(partnerId) ? (
            <div className="online-mark"></div>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="room-name">
        {roomName}
        <div className={readStyle}>
          {userInfo == senderId
            ? `You: ${lastMessage.substr(0, 96)}`
            : lastMessage.substr(0, 100)}
        </div>
      </div>
      <div className="date-info">{allConstants.formatDates(dateInfo)}</div>
    </div>
  )
}

export default RoomInfo
