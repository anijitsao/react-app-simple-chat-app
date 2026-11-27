// Constants
import Constants from "../../utils/constants.utils";

const Message = ({ msgBody, timeSent, senderId, userInfo }) => {
  const allConstants = Constants();
  return (
    <div
      className={senderId == userInfo.userId ? "msg my-msg" : "msg room-msg"}
    >
      {msgBody}
      <span className="time-sent">{allConstants.formatDates(timeSent)}</span>
    </div>
  );
};

export default Message;
